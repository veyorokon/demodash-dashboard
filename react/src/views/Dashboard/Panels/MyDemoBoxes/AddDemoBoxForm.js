import React from "react";
import {Box, Flex, Text, DropDown, Icon, CallToActionButton} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup,
  FormButton
} from "views/Dashboard/Components";
import {Mutation, Query} from "@apollo/react-components";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {Delete} from "@styled-icons/material/Delete";

import {connect} from "react-redux";
import {
  responsive as r,
  getToken,
  getEventVal,
  formatGQLErrorMessage
} from "lib";
import {updateDemoBoxForm} from "redux/actions";
import {
  USER__ACCOUNT_USER_SET,
  ACCOUNT_USER__PRODUCTS,
  CREATE_DEMO_BOX,
  DEMO_BOXES
} from "views/Dashboard/gql";

const ProductsDropDown = props => {
  const {currentAccountUser} = props;
  return (
    <Query
      query={ACCOUNT_USER__PRODUCTS}
      variables={{
        token: getToken().token,
        id: parseInt(currentAccountUser)
      }}
    >
      {({loading, error, data}) => {
        if (loading)
          return (
            <Flex maxWidth="100%" w="25rem" alignItems="center" h="3.5rem">
              <Text>Loading...</Text>
            </Flex>
          );
        if (error)
          return (
            <Flex maxWidth="100%" w="25rem" alignItems="center" h="3.5rem">
              <Text>Error! {error.message}</Text>
            </Flex>
          );
        const {products} = data.accountUser.account;
        return (
          <Flex flexBasis="60%">
            <DropDown
              options={products.map(product => {
                return {text: product.name, value: product.id};
              })}
              br={2}
              maxWidth="100%"
              w="25rem"
              {...props}
            />
          </Flex>
        );
      }}
    </Query>
  );
};

class _CreateDemoBoxForm extends React.Component {
  async createDemoBoxMutation(createDemoBox) {
    const {demoBoxForm, currentAccountUser, updateDemoBoxForm} = this.props;
    let flatForm = {...demoBoxForm};

    if (!flatForm.productIds.data.length)
      return updateDemoBoxForm({
        ...demoBoxForm,
        disabled: true,
        errorMessage: "Please add at least one product."
      });

    updateDemoBoxForm({
      ...demoBoxForm,
      isSubmitting: true
    });
    flatForm.accountUserId = parseInt(currentAccountUser);
    flatForm.productIds = [...flatForm.productIds.data].filter(e => e !== -1);
    flatForm.price = parseFloat(flatForm.price);
    flatForm.shippingPrice = parseFloat(flatForm.shippingPrice);
    flatForm.refillPrice = parseFloat(flatForm.refillPrice);
    flatForm.token = getToken().token;

    try {
      await createDemoBox({
        variables: flatForm
      });
      return updateDemoBoxForm({
        name: "",
        disabled: true,
        isSubmitting: false,
        productIds: {data: []},
        price: (0.0).toFixed(2),
        shippingPrice: (0.0).toFixed(2),
        refillPrice: (0.0).toFixed(2),
        errorMessage: "",
        successMessage: "Demo box was successfully created!"
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateDemoBoxForm({
        ...demoBoxForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {currentAccountUser, demoBoxForm, updateDemoBoxForm} = props;
    const productData = demoBoxForm.productIds.data;
    let hasProducts = productData && productData.length ? true : false;

    const {disabled} = demoBoxForm;
    return (
      <Box
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        boxShadow="0 1px 6px rgba(57,73,76,0.35)"
        bg={"whites.0"}
        br={"4px"}
        {...props}
      >
        <FormSection>
          <Text fs="1.8rem" fw={500}>
            {props.title}
          </Text>
        </FormSection>

        <FormSection bg={"blues.3"} flexDirection="column" pt={4} pb={4}>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Box name:"} />
            <FlexInput
              mt={1}
              value={demoBoxForm.name || ""}
              borderColor={
                demoBoxForm.errorField === "name"
                  ? "oranges.0"
                  : "lightslategrey"
              }
              onChange={evt =>
                updateDemoBoxForm({
                  ...demoBoxForm,
                  name: getEventVal(evt),
                  disabled: false,
                  successMessage: "",
                  errorMessage: "",
                  errorField: ""
                })
              }
            />
          </FormGroup>
          <FormGroup mt={2} mb={r("3 ----> 2")}>
            <FlexField mt={2} mb={2} name={"Products ( lim. 3 ):"} />
            <Flex h="fit-content" flexDirection="column" flexBasis="60%">
              {currentAccountUser !== null &&
                productData &&
                productData.map((product, index) => {
                  return (
                    <Flex
                      maxWidth="25rem"
                      key={index}
                      flexDirection="column"
                      h="fit-content"
                    >
                      <ProductsDropDown
                        onChange={evt => {
                          let newProductsData = [...productData];
                          newProductsData[index] = parseInt(getEventVal(evt));
                          updateDemoBoxForm({
                            ...demoBoxForm,
                            productIds: {data: newProductsData},
                            disabled: false,
                            successMessage: "",
                            errorMessage: "",
                            errorField: ""
                          });
                        }}
                        borderColor={
                          demoBoxForm.errorField === "productIds"
                            ? "oranges.0"
                            : "lightslategrey"
                        }
                        value={productData[index] || -1}
                        defaultButtonProps={{h: "3.5rem"}}
                        defaultOption={"Add a product"}
                        defaultButtonText={"Create a product"}
                        mt={index && 2}
                        useDefaultButton
                        {...props}
                      />
                      {productData.length && (
                        <FormButton
                          mt={2}
                          mb={index === 3 ? 0 : 2}
                          title="Remove this from the box"
                          onClick={() => {
                            let newProductsData = [...productData];
                            newProductsData.splice(index, 1);
                            updateDemoBoxForm({
                              ...demoBoxForm,
                              productIds: {data: newProductsData},
                              successMessage: "",
                              errorMessage: "",
                              errorField: ""
                            });
                          }}
                        >
                          <Flex alignItems="center">
                            <Icon ml={3} mr={2} h={"2.2rem"}>
                              <Delete />
                            </Icon>
                            <Text ml={4}>Remove product</Text>
                          </Flex>
                        </FormButton>
                      )}
                    </Flex>
                  );
                })}

              {productData.length < 3 && (
                <FormButton
                  h={"3.5rem"}
                  title="Add a product"
                  onClick={() => {
                    let newProductsData = [...productData];
                    newProductsData.push(null);
                    updateDemoBoxForm({
                      ...demoBoxForm,
                      productIds: {data: newProductsData},
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  }}
                  mt={hasProducts ? 3 : 0}
                  mb={hasProducts ? 2 : 0}
                >
                  <Flex alignItems="center">
                    <Icon ml={3} mr={2} h={"2.2rem"}>
                      <AddCircle />
                    </Icon>
                    <Text ml={4}>Add a product</Text>
                  </Flex>
                </FormButton>
              )}
            </Flex>
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Demo box price:"} />
            <FlexInput
              mt={1}
              value={demoBoxForm.price}
              type="number"
              min="0"
              onBlur={evt => {
                let amount = getEventVal(evt)
                  ? parseFloat(getEventVal(evt)).toFixed(2)
                  : (0.0).toFixed(2);
                amount = Math.max(amount, 0).toFixed(2);
                updateDemoBoxForm({
                  ...demoBoxForm,
                  price: amount
                });
              }}
              onChange={evt =>
                updateDemoBoxForm({
                  ...demoBoxForm,
                  price: parseFloat(getEventVal(evt)),
                  disabled: false,
                  successMessage: "",
                  errorMessage: "",
                  errorField: ""
                })
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Refill price:"} />
            <FlexInput
              mt={1}
              value={demoBoxForm.refillPrice}
              type="number"
              min="0"
              onBlur={evt => {
                let amount = getEventVal(evt)
                  ? parseFloat(getEventVal(evt)).toFixed(2)
                  : (0.0).toFixed(2);
                amount = Math.max(amount, 0).toFixed(2);
                updateDemoBoxForm({
                  ...demoBoxForm,
                  refillPrice: amount
                });
              }}
              onChange={evt =>
                updateDemoBoxForm({
                  ...demoBoxForm,
                  refillPrice: parseFloat(getEventVal(evt)),
                  disabled: false,
                  successMessage: "",
                  errorMessage: "",
                  errorField: ""
                })
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Shipping price:"} />
            <FlexInput
              mt={1}
              value={demoBoxForm.shippingPrice}
              type="number"
              min="0"
              onBlur={evt => {
                let amount = getEventVal(evt)
                  ? parseFloat(getEventVal(evt)).toFixed(2)
                  : (0.0).toFixed(2);
                amount = Math.max(amount, 0).toFixed(2);
                updateDemoBoxForm({
                  ...demoBoxForm,
                  shippingPrice: amount
                });
              }}
              onChange={evt =>
                updateDemoBoxForm({
                  ...demoBoxForm,
                  shippingPrice: parseFloat(getEventVal(evt)),
                  disabled: false,
                  successMessage: "",
                  errorMessage: "",
                  errorField: ""
                })
              }
            />
          </FormGroup>
        </FormSection>

        <FormSection
          justifyContent={[
            "center",
            "center",
            "center",
            "center",
            "center",
            "flex-end"
          ]}
          flexDirection={r("column ----> row")}
          alignItems="center"
        >
          {demoBoxForm.errorMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {demoBoxForm.errorMessage}
              </Text>
            </Flex>
          )}
          {demoBoxForm.successMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="greens.4">
                {demoBoxForm.successMessage}
              </Text>
            </Flex>
          )}
          <Mutation
            mutation={CREATE_DEMO_BOX}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              },
              {
                query: ACCOUNT_USER__PRODUCTS,
                variables: {
                  token: getToken().token,
                  id: parseInt(currentAccountUser)
                }
              },
              {
                query: DEMO_BOXES,
                variables: {
                  token: getToken().token,
                  accountUserId: parseInt(currentAccountUser)
                }
              }
            ]}
          >
            {createDemoBox => (
              <CallToActionButton
                disabled={disabled}
                cursor={disabled ? "no-drop" : "pointer"}
                hoverBackground={disabled ? "#ffb39f" : "#F87060"}
                bg={disabled ? "#ffb39f" : "oranges.1"}
                color={"whites.0"}
                hoverColor={disabled ? "whites.2" : "whites.0"}
                br={2}
                w={r("100% 25rem ---> 10rem")}
                maxWidth="100%"
                fs={"1.6rem"}
                onClick={() => this.createDemoBoxMutation(createDemoBox)}
              >
                {demoBoxForm.isSubmitting ? "Saving..." : "Save"}
              </CallToActionButton>
            )}
          </Mutation>
        </FormSection>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser,
    demoBoxForm: state.demoBoxForm
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateDemoBoxForm: payload => dispatch(updateDemoBoxForm(payload))
  };
}

const CreateDemoBoxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CreateDemoBoxForm);

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <CreateDemoBoxForm title={"Create a demo box"} />
    </Flex>
  );
};
