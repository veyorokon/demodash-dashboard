import React from "react";
import {Box, Flex, Text, CallToActionButton} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Mutation} from "@apollo/react-components";
import {
  responsive as r,
  getEventVal,
  getToken,
  formatGQLErrorMessage
} from "lib";
import {updateBillingForm} from "redux/actions";
import {connect} from "react-redux";
import {USER__ACCOUNT_USER_SET, CREATE_BILLING_CARD} from "views/Dashboard/gql";

function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, "$& ");
}

class _FormCard extends React.Component {
  async createCardMutation(createCard) {
    const {billingForm, currentAccountUser, updateBillingForm} = this.props;
    updateBillingForm({
      ...billingForm,
      isSubmitting: true,
      disabled: true
    });

    let flatForm = {...billingForm};
    flatForm.accountUserId = parseInt(currentAccountUser);
    flatForm.token = getToken().token;
    flatForm.cardNumber = flatForm.cardNumber.replace(/\s/g, "");

    try {
      await createCard({
        variables: flatForm
      });
      return updateBillingForm({
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        cvc: "",
        name: "",
        disabled: true,
        isSubmitting: false,
        successMessage: "Card was successfully added!"
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateBillingForm({
        ...billingForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {billingForm, updateBillingForm} = props;
    const {disabled} = billingForm;
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

        <FormSection bg={"blues.3"} flexDirection="column" pt={3} pb={4}>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Name:"} />
            <FlexInput
              mt={1}
              value={billingForm.name}
              maxLength={16}
              onChange={evt => {
                let value = getEventVal(evt);
                return updateBillingForm({
                  ...billingForm,
                  name: value,
                  disabled: false,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                });
              }}
              borderColor={
                billingForm.errorField === "name"
                  ? "oranges.0"
                  : "lightslategrey"
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Card number:"} />
            <FlexInput
              mt={1}
              value={format(billingForm.cardNumber.replace(/\s/g, ""))}
              maxLength={19}
              onChange={evt => {
                let value = getEventVal(evt);
                if (!isNaN(value.replace(/\s/g, "")))
                  return updateBillingForm({
                    ...billingForm,
                    cardNumber: value,
                    disabled: false,
                    successMessage: "",
                    errorField: "",
                    errorMessage: ""
                  });
              }}
              borderColor={
                billingForm.errorField === "cardNumber"
                  ? "oranges.0"
                  : "lightslategrey"
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Exp. month:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <FlexInput
                maxLength={2}
                value={billingForm.expirationMonth}
                onChange={evt => {
                  let value = getEventVal(evt);
                  if (!isNaN(value))
                    return updateBillingForm({
                      ...billingForm,
                      expirationMonth: value,
                      disabled: false,
                      successMessage: "",
                      errorField: "",
                      errorMessage: ""
                    });
                }}
                borderColor={
                  billingForm.errorField === "expirationMonth"
                    ? "oranges.0"
                    : "lightslategrey"
                }
              />
            </Flex>
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Exp. year:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <FlexInput
                maxLength={4}
                value={billingForm.expirationYear}
                onChange={evt => {
                  let value = getEventVal(evt);
                  if (!isNaN(value))
                    return updateBillingForm({
                      ...billingForm,
                      expirationYear: value,
                      disabled: false,
                      successMessage: "",
                      errorField: "",
                      errorMessage: ""
                    });
                }}
                borderColor={
                  billingForm.errorField === "expirationYear"
                    ? "oranges.0"
                    : "lightslategrey"
                }
              />
            </Flex>
          </FormGroup>
          <FormGroup>
            <FlexField name={"CVC:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <FlexInput
                maxLength={3}
                value={billingForm.cvc}
                onChange={evt => {
                  let value = getEventVal(evt);
                  if (!isNaN(value))
                    return updateBillingForm({
                      ...billingForm,
                      cvc: value,
                      disabled: false,
                      successMessage: "",
                      errorField: "",
                      errorMessage: ""
                    });
                }}
                borderColor={
                  billingForm.errorField === "cvc"
                    ? "oranges.0"
                    : "lightslategrey"
                }
              />
            </Flex>
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
          {billingForm.errorMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {billingForm.errorMessage}
              </Text>
            </Flex>
          )}
          {billingForm.successMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="greens.4">
                {billingForm.successMessage}
              </Text>
            </Flex>
          )}
          <Mutation
            mutation={CREATE_BILLING_CARD}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              }
            ]}
          >
            {createCard => (
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
                onClick={() => this.createCardMutation(createCard)}
              >
                {billingForm.isSubmitting ? "Saving..." : "Save"}
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
    billingForm: state.billingForm,
    currentAccountUser: state.dashboard.currentAccountUser
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateBillingForm: payload => dispatch(updateBillingForm(payload))
  };
}

const FormCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormCard);

export default props => {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Billing
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <FormCard title={"Add a card"} />
      </Flex>
    </>
  );
};
