import React from "react";
import {Box, Flex, Text, DropDown, CallToActionButton} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Query, Mutation} from "@apollo/react-components";
import {STATES, responsive as r, getEventVal} from "lib";
import {getToken} from "lib";
import {connect} from "react-redux";
import {updateProfileForm} from "redux/actions";
import {ACCOUNT_CATEGORIES, UPDATE_ACCOUNT} from "./gql";
import {USER__ACCOUNT_USER_SET} from "views/Dashboard/gql";

const CategoryDropDown = props => {
  return (
    <Query query={ACCOUNT_CATEGORIES}>
      {({loading, error, data}) => {
        if (loading)
          return (
            <Box h="3.5rem" mb={4}>
              <Text>Loading...</Text>
            </Box>
          );
        if (error)
          return (
            <Box h="3.5rem" mb={4}>
              <Text>Error! {error.message}</Text>
            </Box>
          );
        const options = data.industries;
        return (
          <Flex>
            <DropDown
              options={options}
              br={2}
              maxWidth="100%"
              w="25rem"
              border={"1px solid lightslategrey"}
              hiddenOption={"Select your industry"}
              {...props}
            />
          </Flex>
        );
      }}
    </Query>
  );
};

class _AccountFormCard extends React.Component {
  async updateAccountMutation(updateAccount) {
    const {profileForm, currentAccountUser, updateProfileForm} = this.props;
    updateProfileForm({
      ...profileForm,
      isSubmitting: true
    });
    profileForm.accountUserId = parseInt(currentAccountUser);
    profileForm.token = getToken().token;
    return await updateAccount({
      variables: profileForm
    });
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
                  accountName: getEventVal(evt)
                })
              }
              value={profileForm.accountName}
              mt={1}
            />
          </FormGroup>
          <FormGroup mt={3} mb={r("3 ----> 2")}>
            <FlexField name={"Address:"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    line1: getEventVal(evt)
                  })
                }
                value={profileForm.line1}
                placeholder="Address line 1"
                mb={1}
              />
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    line2: getEventVal(evt)
                  })
                }
                value={profileForm.line2}
                placeholder="Address line 2"
                mb={1}
              />
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    city: getEventVal(evt)
                  })
                }
                value={profileForm.city}
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
                      state: getEventVal(evt)
                    })
                  }
                  value={profileForm.state}
                />
              </Flex>
              <FlexInput
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    zip: getEventVal(evt)
                  })
                }
                value={profileForm.zip}
                placeholder="ZIP"
              />
            </Flex>
          </FormGroup>

          <FormGroup mt={2} mb={r("3 ----> 2")}>
            <FlexField name={"Industries"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <CategoryDropDown
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    choice1: getEventVal(evt)
                  })
                }
                value={profileForm.choice1}
              />
              <CategoryDropDown
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    choice2: getEventVal(evt)
                  })
                }
                value={profileForm.choice2}
                mt={2}
              />
              <CategoryDropDown
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    choice3: getEventVal(evt)
                  })
                }
                value={profileForm.choice3}
                mt={2}
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
        >
          <Mutation
            mutation={UPDATE_ACCOUNT}
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
                hoverBackground={disabled ? "#b2afe2" : "#173bd0"}
                bg={disabled ? "#b2afe2" : "blues.0"}
                color={disabled ? "whites.2" : "whites.0"}
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

export default props => {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Profile
        </Text>
      </Flex>
      <Flex
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        mb={4}
        justifyContent="center"
      >
        <AccountFormCard title={"Account settings"} />
      </Flex>
    </>
  );
};
