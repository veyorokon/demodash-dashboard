import React from "react";
import {Box, Flex, Text, DropDown, CallToActionButton} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Mutation} from "@apollo/react-components";
import {
  UPDATE_INFLUENCER_ACCOUNT,
  USER__ACCOUNT_USER_SET
} from "views/Dashboard/gql";
import {
  STATES,
  MONTHS,
  responsive as r,
  getEventVal,
  formatGQLErrorMessage
} from "lib";
import {getToken} from "lib";
import {connect} from "react-redux";
import {updateProfileForm} from "redux/actions";

class _AccountFormCard extends React.Component {
  async updateAccountMutation(updateAccount) {
    const {profileForm, currentAccountUser, updateProfileForm} = this.props;

    updateProfileForm({
      ...profileForm,
      isSubmitting: true
    });
    let flatForm = {...profileForm};

    flatForm.accountUserId = parseInt(currentAccountUser);
    flatForm.token = getToken().token;
    try {
      await updateAccount({
        variables: flatForm
      });
      return updateProfileForm({
        ...profileForm,
        successMessage: "Settings are up-to-date",
        submitComplete: true,
        isSubmitting: false,
        disabled: true
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateProfileForm({
        ...profileForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {profileForm, updateProfileForm} = props;
    const {disabled} = profileForm;
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
          <FormGroup>
            <FlexField name={"Account name:"} />
            <FlexInput
              onChange={evt =>
                updateProfileForm({
                  ...profileForm,
                  accountName: getEventVal(evt),
                  submitComplete: false
                })
              }
              value={profileForm.accountName || ""}
              mt={1}
            />
          </FormGroup>
          <FormGroup mt={r("3 ----> 2")}>
            <FlexField name={"Address:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    line1: getEventVal(evt),
                    submitComplete: false
                  })
                }
                value={profileForm.line1 || ""}
                placeholder="Address line 1"
                mb={1}
              />
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    line2: getEventVal(evt),
                    submitComplete: false
                  })
                }
                value={profileForm.line2 || ""}
                placeholder="Address line 2"
                mb={1}
              />
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    city: getEventVal(evt),
                    submitComplete: false
                  })
                }
                value={profileForm.city || ""}
                placeholder="City"
                mb={1}
              />
              <Flex mb={2}>
                <DropDown
                  br={2}
                  maxWidth="100%"
                  w="25rem"
                  border={"1px solid lightslategrey"}
                  options={STATES}
                  onChange={evt =>
                    updateProfileForm({
                      ...profileForm,
                      state: getEventVal(evt),
                      submitComplete: false
                    })
                  }
                  value={profileForm.state || ""}
                />
              </Flex>
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    zip: getEventVal(evt),
                    submitComplete: false
                  })
                }
                value={profileForm.zip || ""}
                placeholder="ZIP"
              />
            </Flex>
          </FormGroup>

          <FormGroup mt={r("3 ----> 2")}>
            <FlexField name={"Date of birth:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <Flex>
                <DropDown
                  br={2}
                  maxWidth="100%"
                  w="25rem"
                  border={"1px solid lightslategrey"}
                  defaultOption={"Month"}
                  options={MONTHS}
                  onChange={evt => {
                    updateProfileForm({
                      ...profileForm,
                      dobMonth: parseInt(getEventVal(evt)),
                      submitComplete: false,
                      disabled: false,
                      successMessage: "",
                      errorField: "",
                      errorMessage: ""
                    });
                  }}
                  value={profileForm.dobMonth}
                  borderColor={
                    profileForm.errorField === "dobMonth"
                      ? "oranges.0"
                      : "lightslategrey"
                  }
                />
              </Flex>
              <FlexInput
                placeholder={"Day"}
                maxLength={2}
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    dobDay: parseInt(getEventVal(evt)),
                    submitComplete: false,
                    disabled: false,
                    successMessage: "",
                    errorField: "",
                    errorMessage: ""
                  })
                }
                value={profileForm.dobDay || ""}
                borderColor={
                  profileForm.errorField === "dobDay"
                    ? "oranges.0"
                    : "lightslategrey"
                }
                mt={1}
              />
              <FlexInput
                placeholder={"Year"}
                maxLength={4}
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    dobYear: parseInt(getEventVal(evt)),
                    submitComplete: false,
                    disabled: false,
                    successMessage: "",
                    errorField: "",
                    errorMessage: ""
                  })
                }
                value={profileForm.dobYear || ""}
                borderColor={
                  profileForm.errorField === "dobYear"
                    ? "oranges.0"
                    : "lightslategrey"
                }
                mt={1}
              />
            </Flex>
          </FormGroup>

          <FormGroup mt={r("3 ----> 2")}>
            <FlexField name={"Last four ssn:"} />
            <FlexInput
              onChange={evt =>
                updateProfileForm({
                  ...profileForm,
                  lastFourSsn: getEventVal(evt),
                  submitComplete: false,
                  disabled: false,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                })
              }
              maxLength={4}
              value={profileForm.lastFourSsn || ""}
              borderColor={
                profileForm.errorField === "lastFourSsn"
                  ? "oranges.0"
                  : "lightslategrey"
              }
              mt={1}
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
          {profileForm.submitComplete ? (
            <Flex>
              <Text mb={r("3 ----> 0")}>Settings are up to date.</Text>
            </Flex>
          ) : profileForm.errorMessage ? (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {profileForm.errorMessage}
              </Text>
            </Flex>
          ) : (
            <></>
          )}
          <Mutation
            mutation={UPDATE_INFLUENCER_ACCOUNT}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              }
            ]}
          >
            {updateAccount => (
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
                onClick={() => this.updateAccountMutation(updateAccount)}
              >
                {profileForm.isSubmitting ? "Saving..." : "Save"}
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
    profileForm: state.profileForm,
    currentAccountUser: state.dashboard.currentAccountUser
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateProfileForm: payload => dispatch(updateProfileForm(payload))
  };
}

const AccountFormCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AccountFormCard);

export default AccountFormCard;
