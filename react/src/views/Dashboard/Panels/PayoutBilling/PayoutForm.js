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
import {updateDepositForm} from "redux/actions";
import {connect} from "react-redux";
import {CREATE_BANK} from "views/Dashboard/gql";

class _FormCard extends React.Component {
  async createBankMutation(createBank) {
    const {depositForm, currentAccountUser, updateDepositForm} = this.props;
    updateDepositForm({
      ...depositForm,
      isSubmitting: true,
      disabled: true
    });

    let flatForm = {...depositForm};
    flatForm.accountUserId = parseInt(currentAccountUser);
    flatForm.token = getToken().token;
    try {
      await createBank({
        variables: flatForm
      });
      return updateDepositForm({
        routingNumber: "",
        accountNumber: "",
        accountNumberConfirmation: "",
        disabled: true,
        isSubmitting: false,
        successMessage: "Bank was successfully added!"
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateDepositForm({
        ...depositForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {depositForm, updateDepositForm} = props;
    const isDisabled = depositForm.disabled;
    const disabled =
      isDisabled ||
      depositForm.accountNumber !== depositForm.accountNumberConfirmation;
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
            <FlexField name={"Routing number:"} />
            <FlexInput
              mt={1}
              type="number"
              value={depositForm.routingNumber}
              onChange={evt => {
                let value = getEventVal(evt);
                return updateDepositForm({
                  ...depositForm,
                  routingNumber: value,
                  disabled: !disabled ? false : true,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                });
              }}
              borderColor={
                depositForm.errorField === "routingNumber"
                  ? "oranges.0"
                  : "lightslategrey"
              }
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Account number:"} />
            <FlexInput
              mt={1}
              type="number"
              value={depositForm.accountNumber}
              onChange={evt => {
                let value = getEventVal(evt);
                return updateDepositForm({
                  ...depositForm,
                  accountNumber: value,
                  disabled: false,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                });
              }}
              borderColor={
                depositForm.errorField === "accountNumber"
                  ? "oranges.0"
                  : "lightslategrey"
              }
            />
          </FormGroup>
          <FormGroup>
            <FlexField name={"Verify account number:"} />
            <FlexInput
              type="number"
              mt={1}
              value={depositForm.accountNumberConfirmation}
              onChange={evt => {
                let value = getEventVal(evt);
                return updateDepositForm({
                  ...depositForm,
                  accountNumberConfirmation: value,
                  disabled: false,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                });
              }}
              borderColor={
                depositForm.errorField === "accountNumberConfirmation"
                  ? "oranges.0"
                  : "lightslategrey"
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
          {depositForm.errorMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {depositForm.errorMessage}
              </Text>
            </Flex>
          )}
          {depositForm.successMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="greens.4">
                {depositForm.successMessage}
              </Text>
            </Flex>
          )}
          <Mutation mutation={CREATE_BANK}>
            {createBank => (
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
                onClick={() => this.createBankMutation(createBank)}
              >
                {depositForm.isSubmitting ? "Saving..." : "Save"}
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
    depositForm: state.depositForm,
    currentAccountUser: state.dashboard.currentAccountUser
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateDepositForm: payload => dispatch(updateDepositForm(payload))
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
          Payout
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <FormCard title={"Direct deposit"} />
      </Flex>
    </>
  );
};
