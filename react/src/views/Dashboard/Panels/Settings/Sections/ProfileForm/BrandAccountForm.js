import React from "react";
import {Box, Flex, Text, DropDown, CallToActionButton, Icon} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup,
  FlexText
} from "views/Dashboard/Components";
import {Mutation} from "@apollo/react-components";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {Image} from "@styled-icons/boxicons-solid/Image";
import FileInput from "./Components/FileUploader";
import {
  UPDATE_BRAND_ACCOUNT,
  USER__ACCOUNT_USER_SET
} from "views/Dashboard/gql";
import {STATES, responsive as r, getEventVal} from "lib";
import {getToken, formatGQLErrorMessage} from "lib";
import {connect} from "react-redux";
import {updateProfileForm} from "redux/actions";

function format(s) {
  let dash = "-";
  let position = 2;
  if (!s.includes(dash) && s.length > 2) {
    let output = [s.slice(0, position), dash, s.slice(position)].join("");
    return output;
  }
  if ((s.includes(dash) && s.length <= 3) || s.indexOf(dash) !== position) {
    s = s.replace(dash, "");
    if (s.length > 2)
      return [s.slice(0, position), dash, s.slice(position)].join("");
  }
  return s;
}

class _AccountFormCard extends React.Component {
  async updateBrandAccount(updateAccount) {
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
            <FlexField name={"Website:"} />
            <FlexInput
              onChange={evt =>
                updateProfileForm({
                  ...profileForm,
                  website: getEventVal(evt),
                  submitComplete: false
                })
              }
              value={profileForm.website || ""}
              placeholder="https://"
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
            <FlexField name={"EIN:"} />
            <FlexInput
              disabled={profileForm.einVerified}
              onChange={evt => {
                if (!profileForm.einVerified)
                  updateProfileForm({
                    ...profileForm,
                    ein: getEventVal(evt),
                    submitComplete: false,
                    disabled: false,
                    successMessage: "",
                    errorField: "",
                    errorMessage: ""
                  });
              }}
              maxLength={9}
              value={profileForm.ein ? format(profileForm.ein) : ""}
              mt={1}
              borderColor={
                profileForm.errorField === "ein"
                  ? "oranges.0"
                  : "lightslategrey"
              }
            />
          </FormGroup>

          <FormGroup mt={r("3 ----> 2")}>
            <FlexField name={"Logo:"} />
            <Flex flexBasis="60%" flexDirection="column" h="fit-content">
              {profileForm.logo && (
                <Flex maxWidth="25rem" flexDirection="column" h="fit-content">
                  <FlexText fw={400} h="2.2rem" mb={1} mt={3}>
                    Logo name
                  </FlexText>
                  <Flex mt={1} mb={1} color="oranges.0" alignItems="center">
                    <Icon ml={3} mr={2} h={"2.2rem"}>
                      <Image />
                    </Icon>
                    <Text>{profileForm.logo.name}</Text>
                  </Flex>
                </Flex>
              )}
              <FileInput
                mt={2}
                inputName={"home-account-logo-uploader"}
                icon={<AddCircle />}
                onChange={result =>
                  updateProfileForm({
                    ...profileForm,
                    logo: result,
                    submitComplete: false
                  })
                }
              >
                Add brand logo
              </FileInput>
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
            mutation={UPDATE_BRAND_ACCOUNT}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              }
            ]}
            onCompleted={() =>
              updateProfileForm({
                ...profileForm,
                logoUrl: profileForm.logo,
                submitComplete: true,
                isSubmitting: false,
                disabled: true
              })
            }
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
                onClick={() => this.updateBrandAccount(updateAccount)}
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
