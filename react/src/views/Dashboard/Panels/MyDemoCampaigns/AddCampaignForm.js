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
import {connect} from "react-redux";
import {updateDemoCampaignForm, updatePanel} from "redux/actions";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {Delete} from "@styled-icons/material/Delete";

import {
  USER__ACCOUNT_USER_SET,
  CREATE_DEMO_CAMPAIGN,
  DEMO_BOXES,
  CAMPAIGN_TYPES,
  DEMO_CAMPAIGNS
} from "views/Dashboard/gql";
import {
  responsive as r,
  getToken,
  getEventVal,
  formatGQLErrorMessage
} from "lib";
import styled from "styled-components";

const Price = styled(Text)`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const DemoBoxesDropDown = props => {
  const {currentAccountUser} = props;
  return (
    <Query
      query={DEMO_BOXES}
      variables={{
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser)
      }}
    >
      {({loading, error, data}) => {
        if (loading)
          return (
            <Flex
              maxWidth="100%"
              w="25rem"
              mt={1}
              alignItems="center"
              h="3.5rem"
            >
              <Text>Loading...</Text>
            </Flex>
          );
        if (error)
          return (
            <Flex maxWidth="100%" w="25rem" alignItems="center" h="3.5rem">
              <Text>Error! {error.message}</Text>
            </Flex>
          );
        const {demoBoxes} = data;
        return (
          <Flex flexBasis="60%">
            <DropDown
              options={demoBoxes.map(box => {
                return {text: box.name, value: box.id};
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

const LineItem = props => (
  <Flex mb={1} mt={2} w={"25rem"} maxWidth="100%" flexWrap="wrap" {...props}>
    <Text justifySelf="flex-start" {...props.titleProps}>
      {props.title}
    </Text>
    <Price
      ml={2}
      justifySelf="flex-end"
      color="oranges.0"
      {...props.valueProps}
    >
      {props.value}
    </Price>
  </Flex>
);

class BoxItemsFormGroup extends React.Component {
  calcStripeFee(price) {
    return price - (price * 0.971 - 0.3);
  }

  calcMaxCommission(price) {
    let maxCommission = price - this.calcStripeFee(price) - 0.99;
    return maxCommission;
  }

  calcRemainder(price, commission) {
    commission = commission || 0.0;
    commission = Math.max(commission, 0);
    let remainder = price - this.calcStripeFee(price) - 0.99 - commission;
    return Math.max(remainder, 0);
  }

  render() {
    const {props} = this;
    const {
      demoCampaignForm,
      updateDemoCampaignForm,
      currentAccountUser,
      demoBoxId
    } = props;
    return (
      <Query
        query={DEMO_BOXES}
        variables={{
          token: getToken().token,
          accountUserId: parseInt(currentAccountUser)
        }}
      >
        {({loading, error, data}) => {
          if (loading)
            return (
              <Flex
                maxWidth="100%"
                w="25rem"
                mt={2}
                alignItems="center"
                h="3.5rem"
              >
                <Text>Loading...</Text>
              </Flex>
            );
          if (error)
            return (
              <Flex maxWidth="100%" w="25rem" alignItems="center" h="3.5rem">
                <Text>Error! {error.message}</Text>
              </Flex>
            );
          const {demoBoxes} = data;
          const demoBox = demoBoxes.filter(function(el) {
            return parseInt(el.id) === demoBoxId;
          })[0];
          const commissionData = demoCampaignForm.commissions.data;
          return (
            <FormGroup mb={r("3 ----> 2")}>
              <FlexField name={"Commission:"} />
              <Flex mt={2} flexBasis="60%" flexDirection="column">
                {demoBox &&
                  demoBox.items &&
                  demoBox.items.map((item, indx) => {
                    const {price} = item.product;
                    const commissionAmount = commissionData[indx]
                      ? commissionData[indx].amount
                      : (0.0).toFixed(2);

                    return (
                      <Flex
                        mt={1}
                        w="fit-content"
                        maxWidth="100%"
                        borderBottom={
                          demoBox.items.length - 1 === indx
                            ? "none"
                            : "1px solid lightslategrey"
                        }
                        pb={demoBox.items.length - 1 === indx ? 0 : 2}
                        mb={demoBox.items.length - 1 === indx ? 0 : 2}
                        key={indx}
                        fleGrow={0}
                        flexDirection="column"
                      >
                        <LineItem
                          mt={indx === 0 ? 1 : 2}
                          titleProps={{
                            fw: 500,
                            fs: "1.6rem"
                          }}
                          valueProps={{fw: 500}}
                          title={item.product.name}
                          value={`$${price.toFixed(2)}`}
                        />
                        <LineItem
                          valueProps={{fw: 500}}
                          title={"transaction fee ( 2.9% + 0.30 ):"}
                          value={`$${this.calcStripeFee(price).toFixed(2)}`}
                        />
                        <LineItem
                          valueProps={{fw: 500}}
                          title={"demodash fee:"}
                          value={`$0.99`}
                        />
                        <Text mb={1} mt={2}>
                          Commission:
                        </Text>
                        <FlexInput
                          value={commissionAmount}
                          type="number"
                          min="0"
                          max={price}
                          onBlur={evt => {
                            let newCommissionData = [...commissionData];
                            let amount = getEventVal(evt)
                              ? parseFloat(getEventVal(evt)).toFixed(2)
                              : (0.0).toFixed(2);
                            amount = Math.max(amount, 0).toFixed(2);
                            let saleLimit = newCommissionData.saleLimit
                              ? newCommissionData.saleLimit
                              : -1;
                            newCommissionData[indx] = {
                              ...newCommissionData[indx],
                              boxItemId: item.id,
                              amount,
                              saleLimit
                            };
                            updateDemoCampaignForm({
                              ...demoCampaignForm,
                              commissions: {data: newCommissionData}
                            });
                          }}
                          onChange={evt => {
                            let newCommissionData = [...commissionData];
                            let amount = parseFloat(getEventVal(evt));
                            let maxCommission = this.calcMaxCommission(price);
                            amount = Math.min(amount, maxCommission);
                            let saleLimit = newCommissionData.saleLimit
                              ? newCommissionData.saleLimit
                              : -1;
                            newCommissionData[indx] = {
                              ...newCommissionData[indx],
                              boxItemId: item.id,
                              amount,
                              saleLimit
                            };
                            updateDemoCampaignForm({
                              ...demoCampaignForm,
                              commissions: {data: newCommissionData},
                              disabled: false,
                              successMessage: "",
                              errorMessage: "",
                              errorField: ""
                            });
                          }}
                        />
                        <LineItem
                          mt={1}
                          valueProps={{fw: 500, color: "greens.4"}}
                          title={"Remainder:"}
                          value={`$${this.calcRemainder(
                            price,
                            commissionAmount
                          ).toFixed(2)}`}
                        />

                        <Flex mb={1} mt={1}>
                          <Flex
                            h="fit-content"
                            w={"25rem"}
                            maxWidth="100%"
                            flexDirection="column"
                          >
                            {commissionData[indx] &&
                            commissionData[indx].saleLimit !== -1 &&
                            commissionData[indx].saleLimit !== null ? (
                              <>
                                <Text mt={1} mb={1} fw={400}>
                                  Set maximum sales
                                </Text>
                                <FlexInput
                                  h={"3.6"}
                                  value={commissionData[indx].saleLimit}
                                  type="number"
                                  min="0"
                                  step={1}
                                  onBlur={evt => {
                                    let newCommissionData = [...commissionData];
                                    newCommissionData[indx] = {
                                      ...newCommissionData[indx],
                                      boxItemId: item.id,
                                      saleLimit: getEventVal(evt)
                                        ? Math.max(
                                            parseInt(getEventVal(evt)),
                                            0
                                          )
                                        : 0
                                    };
                                    updateDemoCampaignForm({
                                      ...demoCampaignForm,
                                      commissions: {data: newCommissionData}
                                    });
                                  }}
                                  onChange={evt => {
                                    let newCommissionData = [...commissionData];
                                    newCommissionData[indx] = {
                                      ...newCommissionData[indx],
                                      boxItemId: item.id,
                                      saleLimit: parseInt(getEventVal(evt))
                                    };
                                    updateDemoCampaignForm({
                                      ...demoCampaignForm,
                                      commissions: {data: newCommissionData},
                                      disabled: false,
                                      successMessage: "",
                                      errorMessage: "",
                                      errorField: ""
                                    });
                                  }}
                                />
                                <FormButton
                                  mb={demoBox.items.length - 1 === indx ? 0 : 1}
                                  mt={2}
                                  //mb={index === 3 ? 0 : 2}
                                  title="Delete sale limit"
                                  onClick={evt => {
                                    let newCommissionData = [...commissionData];
                                    newCommissionData[indx] = {
                                      ...newCommissionData[indx],
                                      boxItemId: item.id,
                                      saleLimit: -1
                                    };
                                    updateDemoCampaignForm({
                                      ...demoCampaignForm,
                                      commissions: {data: newCommissionData},
                                      disabled: false,
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
                                    <Text ml={4}>Delete sale limit</Text>
                                  </Flex>
                                </FormButton>
                              </>
                            ) : (
                              <>
                                <Text mt={1} mb={1} fw={400}>
                                  Add a limit on sales for this product?
                                </Text>
                                <FormButton
                                  mb={demoBox.items.length - 1 === indx ? 0 : 1}
                                  mt={2}
                                  //mb={index === 3 ? 0 : 2}
                                  title="Add sale limit"
                                  onClick={evt => {
                                    let newCommissionData = [...commissionData];
                                    newCommissionData[indx] = {
                                      ...newCommissionData[indx],
                                      boxItemId: item.id,
                                      saleLimit: 1000
                                    };
                                    updateDemoCampaignForm({
                                      ...demoCampaignForm,
                                      commissions: {data: newCommissionData},
                                      disabled: false,
                                      successMessage: "",
                                      errorMessage: "",
                                      errorField: ""
                                    });
                                  }}
                                >
                                  <Flex alignItems="center">
                                    <Icon ml={3} mr={2} h={"2.2rem"}>
                                      <AddCircle />
                                    </Icon>
                                    <Text ml={4}>Add sale limit</Text>
                                  </Flex>
                                </FormButton>
                              </>
                            )}
                          </Flex>
                        </Flex>
                      </Flex>
                    );
                  })}
              </Flex>
            </FormGroup>
          );
        }}
      </Query>
    );
  }
}

const CampaignTypeDropDown = props => {
  return (
    <Query query={CAMPAIGN_TYPES}>
      {({loading, error, data}) => {
        if (loading)
          return (
            <Flex
              maxWidth="100%"
              w="25rem"
              mt={1}
              alignItems="center"
              h="3.5rem"
            >
              <Text>Loading...</Text>
            </Flex>
          );
        if (error)
          return (
            <Flex
              maxWidth="100%"
              w="25rem"
              mt={1}
              alignItems="center"
              h="3.5rem"
            >
              <Text>Error! {error.message}</Text>
            </Flex>
          );
        const options = data.campaignTypes;
        return (
          <Flex>
            <DropDown
              options={options}
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

class _AddCampaignForm extends React.Component {
  async createDemoCampaignMutation(createDemoCampaign) {
    const {
      currentAccountUser,
      demoCampaignForm,
      updateDemoCampaignForm
    } = this.props;
    updateDemoCampaignForm({
      ...demoCampaignForm,
      isSubmitting: true
    });

    let flatForm = {...demoCampaignForm};
    flatForm.token = getToken().token;
    flatForm.accountUserId = parseInt(currentAccountUser);

    let commissionsData = [...demoCampaignForm.commissions.data];
    let newCommissionsData = [];
    for (let indx in commissionsData) {
      let commissionItem = commissionsData[indx];
      let newCommissionItem = {};
      if (commissionItem.amount) {
        newCommissionItem.amount = parseFloat(commissionItem.amount);
      }
      if (commissionItem.boxItemId) {
        newCommissionItem.boxItemId = parseInt(commissionItem.boxItemId);
      }
      if (commissionItem.saleLimit) {
        newCommissionItem.saleLimit = parseInt(commissionItem.saleLimit);
        if (newCommissionItem.saleLimit === -1)
          newCommissionItem.saleLimit = null;
      }
      newCommissionsData.push(newCommissionItem);
    }
    flatForm.commissions = newCommissionsData;

    try {
      await createDemoCampaign({
        variables: flatForm
      });
      return updateDemoCampaignForm({
        demoBoxId: -1,
        type: -1,
        name: "",
        demoerLimit: 30,
        refillLimit: 65,
        commissions: {
          data: []
        },
        disabled: false,
        errorMessage: "",
        errorField: "",
        successMessage: "Demo campaign was successfully created!"
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateDemoCampaignForm({
        ...demoCampaignForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {
      currentAccountUser,
      demoCampaignForm,
      updateDemoCampaignForm,
      updatePanel
    } = props;
    const {demoBoxId} = demoCampaignForm;
    let hasDemoerLimit = demoCampaignForm.demoerLimit === null ? false : true;
    let hasRefillLimit = demoCampaignForm.refillLimit === null ? false : true;
    const {disabled} = demoCampaignForm;
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
            <FlexField name={"Campaign name:"} />
            <FlexInput
              mt={1}
              value={demoCampaignForm.name || ""}
              borderColor={
                demoCampaignForm.errorField === "name"
                  ? "oranges.0"
                  : "lightslategrey"
              }
              onChange={evt =>
                updateDemoCampaignForm({
                  ...demoCampaignForm,
                  name: getEventVal(evt),
                  disabled: false,
                  successMessage: "",
                  errorMessage: "",
                  errorField: ""
                })
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Campaign type:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <CampaignTypeDropDown
                defaultOption={"Choose a campaign type"}
                borderColor={
                  demoCampaignForm.errorField === "type"
                    ? "oranges.0"
                    : "lightslategrey"
                }
                onChange={evt =>
                  updateDemoCampaignForm({
                    ...demoCampaignForm,
                    type: getEventVal(evt),
                    disabled: false,
                    successMessage: "",
                    errorMessage: "",
                    errorField: ""
                  })
                }
                value={demoCampaignForm.type}
              />
            </Flex>
          </FormGroup>

          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Demoer limit:"} />
            <Flex h="fit-content" flexBasis="60%" flexDirection="column" mt={2}>
              {hasDemoerLimit && (
                <FlexInput
                  h={"3.6"}
                  value={demoCampaignForm.demoerLimit}
                  type="number"
                  min="0"
                  step={1}
                  onBlur={evt => {
                    let demoerLimit = getEventVal(evt)
                      ? Math.max(parseInt(getEventVal(evt)), 0)
                      : 0;
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      demoerLimit: demoerLimit
                    });
                  }}
                  onChange={evt => {
                    let demoerLimit = parseInt(getEventVal(evt));
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      demoerLimit: demoerLimit,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  }}
                />
              )}
              <FormButton
                h={"3.5rem"}
                title={
                  hasDemoerLimit ? "Delete demoer limit" : "Add a demoer limit"
                }
                onClick={() => {
                  if (hasDemoerLimit)
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      demoerLimit: null,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  else
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      demoerLimit: 30,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                }}
                mt={hasDemoerLimit ? 2 : 0}
                mb={hasDemoerLimit ? 1 : 0}
              >
                <Flex alignItems="center">
                  <Icon ml={3} mr={2} h={"2.2rem"}>
                    {hasDemoerLimit ? <Delete /> : <AddCircle />}
                  </Icon>
                  <Text ml={4}>
                    {hasDemoerLimit
                      ? "Delete demoer limit"
                      : "Add a demoer limit"}
                  </Text>
                </Flex>
              </FormButton>
            </Flex>
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Demo box refill limit:"} />
            <Flex h="fit-content" flexBasis="60%" flexDirection="column" mt={2}>
              {hasRefillLimit && (
                <FlexInput
                  h={"3.6"}
                  value={demoCampaignForm.refillLimit}
                  type="number"
                  min="0"
                  step={1}
                  onBlur={evt => {
                    let refillLimit = getEventVal(evt)
                      ? Math.max(parseInt(getEventVal(evt)), 0)
                      : 0;
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      refillLimit: refillLimit,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  }}
                  onChange={evt => {
                    let refillLimit = parseInt(getEventVal(evt));
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      refillLimit: refillLimit,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  }}
                />
              )}
              <FormButton
                h={"3.5rem"}
                title={
                  hasRefillLimit
                    ? "Delete demo box refill limit"
                    : "Add a demo box refill limit"
                }
                onClick={() => {
                  if (hasRefillLimit)
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      refillLimit: null,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  else
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      refillLimit: 65,
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                }}
                mt={hasRefillLimit ? 2 : 0}
                mb={hasRefillLimit ? 1 : 0}
              >
                <Flex alignItems="center">
                  <Icon ml={3} mr={2} h={"2.2rem"}>
                    {hasRefillLimit ? <Delete /> : <AddCircle />}
                  </Icon>
                  <Text ml={4}>
                    {hasRefillLimit
                      ? "Delete refill limit"
                      : "Add a refill limit"}
                  </Text>
                </Flex>
              </FormButton>
            </Flex>
          </FormGroup>

          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Demo box:"} />
            <Flex h="fit-content" flexDirection="column" flexBasis="60%">
              {currentAccountUser !== null && (
                <DemoBoxesDropDown
                  useDefaultButton
                  mt={2}
                  value={demoCampaignForm.demoBoxId}
                  defaultClick={() => updatePanel("myDemoBoxes")}
                  defaultOption={"Choose a demo box"}
                  defaultButtonText={"Create a demo box"}
                  defaultButtonProps={{h: "3.5rem"}}
                  borderColor={
                    demoCampaignForm.errorField === "demoBoxId"
                      ? "oranges.0"
                      : "lightslategrey"
                  }
                  onChange={evt => {
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      demoBoxId: parseInt(getEventVal(evt)),
                      commissions: {data: []},
                      disabled: false,
                      successMessage: "",
                      errorMessage: "",
                      errorField: ""
                    });
                  }}
                  currentAccountUser={currentAccountUser}
                />
              )}
            </Flex>
          </FormGroup>
          {demoBoxId && demoBoxId !== -1 && (
            <BoxItemsFormGroup demoBoxId={demoBoxId} {...props} />
          )}
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
          {demoCampaignForm.errorMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {demoCampaignForm.errorMessage}
              </Text>
            </Flex>
          )}
          {demoCampaignForm.successMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="greens.4">
                {demoCampaignForm.successMessage}
              </Text>
            </Flex>
          )}
          <Mutation
            mutation={CREATE_DEMO_CAMPAIGN}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              },
              {
                query: DEMO_CAMPAIGNS,
                variables: {
                  token: getToken().token,
                  accountUserId: parseInt(currentAccountUser)
                }
              }
            ]}
          >
            {createDemoCampaign => (
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
                onClick={() =>
                  this.createDemoCampaignMutation(createDemoCampaign)
                }
              >
                {demoCampaignForm.isSubmitting ? "Saving..." : "Save"}
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
    demoCampaignForm: state.demoCampaignForm
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateDemoCampaignForm: payload =>
      dispatch(updateDemoCampaignForm(payload)),
    updatePanel: payload => dispatch(updatePanel(payload))
  };
}

const AddCampaign = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddCampaignForm);

const AddCampaignForm = props => {
  return (
    <Flex mb={4} justifyContent="center">
      <AddCampaign title={"Create a demo campaign"} />
    </Flex>
  );
};
export default AddCampaignForm;
