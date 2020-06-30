import React from "react";
import {Box, Flex, Text, CallToActionButton} from "components";
import {FormSection, FormGroup} from "views/Dashboard/Components";
import AccountForm from "views/Auth/Register/Sections/Forms/AccountForm";
import {Mutation} from "@apollo/react-components";
import {gql} from "apollo-boost";
import {
  updateAccountForm,
  updateCurrentAccountUser,
  updatePanel
} from "redux/actions";
import {responsive as r, getToken, formatGQLErrorMessage} from "lib";
import {connect} from "react-redux";

import {USER__ACCOUNT_USER_SET} from "views/Dashboard/gql";

const CREATE_ACCOUNT = gql`
  mutation createAccount($token: String!, $type: String!) {
    createAccount(token: $token, type: $type) {
      account {
        id
        liveMode
        type
      }
    }
  }
`;

class _FormCard extends React.Component {
  getLastAccountId() {
    const {accountUserSet} = this.props;
    if (accountUserSet.length)
      return accountUserSet[accountUserSet.length - 1].id;
    return [];
  }

  async createAccountMutation(createAccount) {
    const {accountForm, updateAccountForm} = this.props;
    updateAccountForm({
      ...accountForm,
      isSubmitting: true,
      disabled: true
    });

    const token = getToken().token;
    try {
      await createAccount({
        variables: {token: token, ...accountForm}
      });
      return updateAccountForm({
        type: "Brand",
        disabled: true,
        isSubmitting: false
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateAccountForm({
        ...accountForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {accountForm, updateCurrentAccountUser, updatePanel} = props;
    const {disabled} = accountForm;
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
          <FormGroup ml={"auto"} mr={"auto"} w={r("100% ---> 50rem --> 45rem")}>
            <AccountForm bg={"blues.3"} />
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
          <Mutation
            awaitRefetchQueries
            mutation={CREATE_ACCOUNT}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              }
            ]}
            onCompleted={() => {
              updateCurrentAccountUser(this.getLastAccountId());
              return updatePanel("home");
            }}
          >
            {createAccount => (
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
                onClick={() => this.createAccountMutation(createAccount)}
              >
                {accountForm.isSubmitting ? "Creating..." : "Create"}
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
    accountForm: state.accountForm,
    accountUserSet: state.dashboard.accountUserSet
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateAccountForm: payload => dispatch(updateAccountForm(payload)),
    updateCurrentAccountUser: payload =>
      dispatch(updateCurrentAccountUser(payload)),
    updatePanel: payload => dispatch(updatePanel(payload))
  };
}

const FormCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormCard);

export default function CreateAccountForm(props) {
  return (
    <Flex mb={4} justifyContent="center">
      <FormCard title={"Create an account"} />
    </Flex>
  );
}
