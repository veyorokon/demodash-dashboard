import React from "react";
import {
  Box,
  Flex,
  Text,
  DropDown,
  CallToActionButton,
  Label,
  Icon,
  Input
} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup,
  FlexText
} from "views/Dashboard/Components";
import {Query, Mutation} from "@apollo/react-components";
import {STATES, responsive as r, getEventVal} from "lib";
import {getToken} from "lib";
import {connect} from "react-redux";
import {updateProfileForm} from "redux/actions";
import {
  ACCOUNT_CATEGORIES,
  UPDATE_ACCOUNT,
  USER__ACCOUNT_USER_SET
} from "views/Dashboard/gql";
import {AddCircle} from "@styled-icons/material/AddCircle";
import {Image} from "@styled-icons/boxicons-solid/Image";

class FileInput extends React.Component {
  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      if (file.size > (this.props.maxSize || 2097152))
        return this.props.onChange({
          errorMessage: "Logo is too large! Max size allowed is 2MB."
        });
      reader.onloadend = () => {
        this.setState({
          file: file,
          base64: reader.result
        });
        return this.props.onChange({
          name: file.name,
          encoding: reader.result.replace("data:image/svg+xml;base64,", "")
        });
      };
    } catch {
      return null;
    }
  }

  render() {
    return (
      <>
        <Label
          hoverBackground="#FFC651"
          cursor="pointer"
          br={2}
          bg={"yellows.1"}
          display="flex"
          alignItems="center"
          h={"3.5rem"}
          w="25rem"
          maxWidth={"100%"}
          htmlFor="account-logo-upload"
          {...this.props}
        >
          <Icon ml={3} mr={2} h={"2.2rem"}>
            <AddCircle />
          </Icon>
          <Text ml={4}>{this.props.children}</Text>
        </Label>
        <Input
          display="none"
          onChange={evt => this.handleImageChange(evt)}
          id="account-logo-upload"
          type="file"
          accept=".svg"
        />
      </>
    );
  }
}

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
    let flatForm = {...profileForm};

    flatForm.accountUserId = parseInt(currentAccountUser);
    flatForm.token = getToken().token;
    if (flatForm.choice1 === -1) flatForm.choice1 = null;
    if (flatForm.choice2 === -1) flatForm.choice2 = null;
    if (flatForm.choice3 === -1) flatForm.choice3 = null;
    return updateAccount({
      variables: flatForm
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
                  accountName: getEventVal(evt),
                  submitComplete: false
                })
              }
              value={profileForm.accountName || ""}
              mt={1}
            />
          </FormGroup>
          <FormGroup mt={3}>
            <FlexField mt={2} name={"Website:"} />
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
              mb={1}
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

          <FormGroup mt={2} mb={r("3 ----> 2")}>
            <FlexField name={"Industries"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <CategoryDropDown
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    choice1: getEventVal(evt),
                    submitComplete: false
                  })
                }
                defaultOption={"Choose an industry"}
                value={profileForm.choice1}
              />
              <CategoryDropDown
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    choice2: getEventVal(evt),
                    submitComplete: false
                  })
                }
                defaultOption={"Choose an industry"}
                value={profileForm.choice2}
                mt={2}
              />
              <CategoryDropDown
                onChange={evt =>
                  updateProfileForm({
                    ...profileForm,
                    choice3: getEventVal(evt),
                    submitComplete: false
                  })
                }
                defaultOption={"Choose an industry"}
                value={profileForm.choice3}
                mt={2}
              />
            </Flex>
          </FormGroup>

          {profileForm.type === "Brand" && (
            <FormGroup mt={3}>
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
                  onChange={result =>
                    updateProfileForm({
                      ...profileForm,
                      logo: result,
                      submitComplete: false
                    })
                  }
                >
                  {profileForm.logo ? "Change brand logo" : "Add brand logo"}
                </FileInput>
              </Flex>
            </FormGroup>
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
          {profileForm.submitComplete && (
            <Flex>
              <Text mb={r("3 ----> 0")}>Settings are up to date.</Text>
            </Flex>
          )}
          <Mutation
            mutation={UPDATE_ACCOUNT}
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
