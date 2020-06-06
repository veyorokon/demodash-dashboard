import React from "react";
import {Box, Flex, Text, DropDown} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {responsive as r, getToken} from "lib";
import {updateDemoBoxForm} from "redux/actions";
import {ACCOUNT_USER__PRODUCTS} from "./gql";

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
            <Flex alignItems="center" h="3.5rem">
              <Text>Loading...</Text>
            </Flex>
          );
        if (error)
          return (
            <Flex alignItems="center" h="3.5rem">
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
              border={"1px solid lightslategrey"}
              {...props}
            />
          </Flex>
        );
      }}
    </Query>
  );
};

const _CreateDemoBoxForm = props => {
  const {currentAccountUser, demoBoxForm, updateDemoBoxForm} = props;
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
          <FlexField mt={2} mb={2} name={"Choose a product:"} />
          <Flex flexDirection="column" flexBasis="60%">
            {currentAccountUser !== null && (
              <ProductsDropDown
                onChange={evt =>
                  updateDemoBoxForm({
                    ...demoBoxForm,
                    productId: parseInt(evt.target.value)
                  })
                }
                hiddenOption={"Add a product"}
                defaultButtonText={"Create a product"}
                useDefaultButton
                {...props}
              />
            )}
          </Flex>
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Demo box price:"} />
          <FlexInput
            mt={1}
            value={demoBoxForm.boxPrice}
            type="number"
            min="0"
            onBlur={evt =>
              updateDemoBoxForm({
                ...demoBoxForm,
                boxPrice: evt.target.value
                  ? parseFloat(evt.target.value).toFixed(2)
                  : (0.0).toFixed(2)
              })
            }
            onChange={evt =>
              updateDemoBoxForm({
                ...demoBoxForm,
                boxPrice: parseFloat(evt.target.value)
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
            onBlur={evt =>
              updateDemoBoxForm({
                ...demoBoxForm,
                refillPrice: evt.target.value
                  ? parseFloat(evt.target.value).toFixed(2)
                  : (0.0).toFixed(2)
              })
            }
            onChange={evt =>
              updateDemoBoxForm({
                ...demoBoxForm,
                refillPrice: parseFloat(evt.target.value)
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
            onBlur={evt =>
              updateDemoBoxForm({
                ...demoBoxForm,
                shippingPrice: evt.target.value
                  ? parseFloat(evt.target.value).toFixed(2)
                  : (0.0).toFixed(2)
              })
            }
            onChange={evt =>
              updateDemoBoxForm({
                ...demoBoxForm,
                shippingPrice: parseFloat(evt.target.value)
              })
            }
          />
        </FormGroup>
      </FormSection>

      <FormSection justifyContent="flex-end">
        <Text fs="1.6rem" fw={500}>
          Save
        </Text>
      </FormSection>
    </Box>
  );
};

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
