import React from "react";
import {Box, Flex, Text, DropDown, Icon} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup,
  FormButton
} from "views/Dashboard/Components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {updateDemoCampaignForm} from "redux/actions";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {Delete} from "@styled-icons/material/Delete";

import {DEMO_BOXES} from "views/Dashboard/gql";
import {responsive as r, getToken, getEventVal} from "lib";
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
  <Flex mb={1} mt={2} w={"25rem"} maxWidth="100%" flexWrap="wrap">
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
          const commissionData = demoCampaignForm.commission.data;
          return (
            <FormGroup mb={r("3 ----> 2")}>
              <FlexField mt={2} mb={2} name={"Commission on sale:"} />
              <Flex mt={1} flexBasis="60%" flexDirection="column">
                {demoBox.items &&
                  demoBox.items.map((item, indx) => {
                    const {price} = item.product;
                    const commissionAmount = commissionData[indx]
                      ? commissionData[indx].amount
                      : (0.0).toFixed(2);

                    return (
                      <Flex
                        w="fit-content"
                        maxWidth="100%"
                        borderBottom={
                          demoBox.items.length - 1 === indx
                            ? "none"
                            : "1px solid lightslategrey"
                        }
                        pb={2}
                        mb={2}
                        key={indx}
                        fleGrow={0}
                        flexDirection="column"
                      >
                        <LineItem
                          titleProps={{fw: 500}}
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
                          placeholder="$ amount:"
                          min="0"
                          max={price}
                          onBlur={evt => {
                            let newCommissionData = [...commissionData];
                            let amount = getEventVal(evt)
                              ? parseFloat(getEventVal(evt)).toFixed(2)
                              : (0.0).toFixed(2);
                            amount = Math.max(amount, 0).toFixed(2);
                            newCommissionData[indx] = {
                              ...newCommissionData[indx],
                              boxItemId: item.id,
                              amount
                            };
                            updateDemoCampaignForm({
                              ...demoCampaignForm,
                              commission: {data: newCommissionData}
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
                              commission: {data: newCommissionData}
                            });
                          }}
                        />
                        <LineItem
                          titleProps={{fw: 500}}
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
                                  placeholder="Max number of sales"
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
                                      commission: {data: newCommissionData}
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
                                      commission: {data: newCommissionData}
                                    });
                                  }}
                                />
                                <FormButton
                                  mb={1}
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
                                      commission: {data: newCommissionData}
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
                                  mb={1}
                                  mt={2}
                                  //mb={index === 3 ? 0 : 2}
                                  title="Add sale limit"
                                  onClick={evt => {
                                    let newCommissionData = [...commissionData];
                                    newCommissionData[indx] = {
                                      ...newCommissionData[indx],
                                      saleLimit: 1000
                                    };
                                    updateDemoCampaignForm({
                                      ...demoCampaignForm,
                                      commission: {data: newCommissionData}
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

class _AddCampaignForm extends React.Component {
  render() {
    const {props} = this;
    const {
      currentAccountUser,
      demoCampaignForm,
      updateDemoCampaignForm
    } = props;
    const {demoBoxId} = demoCampaignForm;
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
            <FlexField name={"Demo box:"} />
            <Flex h="fit-content" flexDirection="column" flexBasis="60%">
              {currentAccountUser !== null && (
                <DemoBoxesDropDown
                  useDefaultButton
                  mt={2}
                  value={demoCampaignForm.demoBoxId}
                  defaultOption={"Add a demo box"}
                  defaultButtonText={"Create a demo box"}
                  onChange={evt => {
                    updateDemoCampaignForm({
                      ...demoCampaignForm,
                      demoBoxId: parseInt(getEventVal(evt)),
                      commission: {data: []}
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

        <FormSection justifyContent="flex-end">
          <Text fs="1.6rem" fw={500}>
            Save
          </Text>
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
    updateDemoCampaignForm: payload => dispatch(updateDemoCampaignForm(payload))
  };
}

const AddCampaignForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddCampaignForm);

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <AddCampaignForm title={"Create a demo campaign"} />
    </Flex>
  );
};
