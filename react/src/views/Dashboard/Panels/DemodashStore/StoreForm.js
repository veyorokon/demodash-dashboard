import React from "react";
import {Box, Flex, Text, CallToActionButton} from "components";
import {
  FlexInput,
  FlexField,
  FlexTextArea,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Mutation} from "@apollo/react-components";
import {
  UPDATE_ACCOUNT_STORE,
  USER__ACCOUNT_USER_SET
} from "views/Dashboard/gql";

import {connect} from "react-redux";
import {
  responsive as r,
  getEventVal,
  getToken,
  formatGQLErrorMessage
} from "lib";
import {updateDemodashStoreForm} from "redux/actions";

function removeNumbers(str) {
  return str.replace(/[0-9]/g, "");
}
function removeLetters(str) {
  return str.replace(/[a-z]/gi, "");
}
function getCharsToRemove(str) {
  let charFilter = removeNumbers(str);
  charFilter = removeLetters(charFilter);
  charFilter = charFilter.replace("-", "");
  return charFilter;
}
function formatStr(str) {
  if (!str) return "";
  let formattedStr = str.toLowerCase();
  let filterChars = getCharsToRemove(formattedStr);
  for (var i = 0; i < filterChars.length; i++) {
    let char = filterChars.charAt(i);
    formattedStr = formattedStr.replace(char, "");
  }
  return formattedStr;
}

class _FormCard extends React.Component {
  async updateAccountStoreMutation(updateAccountStore) {
    const {
      currentAccountUser,
      demodashStoreForm,
      updateDemodashStoreForm
    } = this.props;
    try {
      return await updateAccountStore({
        variables: {
          token: getToken().token,
          accountUserId: parseInt(currentAccountUser),
          ...demodashStoreForm
        }
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateDemodashStoreForm({
        ...demodashStoreForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {demodashStoreForm, updateDemodashStoreForm} = props;
    const {disabled} = demodashStoreForm;
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
            <FlexField name={"Store handle:"} />
            <Flex flexBasis="60%" flexDirection="column">
              <FlexInput
                value={demodashStoreForm.handle || ""}
                borderColor={
                  demodashStoreForm.errorField === "handle"
                    ? "oranges.0"
                    : "lightslategrey"
                }
                onChange={evt =>
                  updateDemodashStoreForm({
                    ...demodashStoreForm,
                    handle: formatStr(getEventVal(evt)),
                    disabled: false,
                    successMessage: "",
                    errorField: "",
                    errorMessage: ""
                  })
                }
                mt={1}
                placeholder="shop.demodash.com..."
              />
              <Text fs={"1.2rem"} mt={1} ml={1} color="navys.2">
                shop.demodash.com/{demodashStoreForm.handle}
              </Text>
            </Flex>
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Store name:"} />
            <FlexInput
              value={demodashStoreForm.name || ""}
              borderColor={
                demodashStoreForm.errorField === "name"
                  ? "oranges.0"
                  : "lightslategrey"
              }
              onChange={evt =>
                updateDemodashStoreForm({
                  ...demodashStoreForm,
                  name: getEventVal(evt),
                  disabled: false,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                })
              }
              mt={1}
            />
          </FormGroup>
          <FormGroup mb={r("3 ----> 2")}>
            <FlexField name={"Store description:"} />
            <FlexTextArea
              value={demodashStoreForm.description || ""}
              borderColor={
                demodashStoreForm.errorField === "description"
                  ? "oranges.0"
                  : "lightslategrey"
              }
              onChange={evt =>
                updateDemodashStoreForm({
                  ...demodashStoreForm,
                  description: getEventVal(evt),
                  disabled: false,
                  successMessage: "",
                  errorField: "",
                  errorMessage: ""
                })
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
          {demodashStoreForm.errorMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="oranges.0">
                {demodashStoreForm.errorMessage}
              </Text>
            </Flex>
          )}
          {demodashStoreForm.successMessage && (
            <Flex>
              <Text mb={r("3 ----> 0")} color="greens.4">
                {demodashStoreForm.successMessage}
              </Text>
            </Flex>
          )}
          <Mutation
            awaitRefetchQueries
            mutation={UPDATE_ACCOUNT_STORE}
            refetchQueries={[
              {
                query: USER__ACCOUNT_USER_SET,
                variables: {token: getToken().token}
              }
            ]}
            onCompleted={() =>
              updateDemodashStoreForm({
                ...demodashStoreForm,
                successMessage: "Your demodash store was successfully updated!",
                isSubmitting: false,
                disabled: true
              })
            }
          >
            {updateAccountStore => (
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
                  this.updateAccountStoreMutation(updateAccountStore)
                }
              >
                {demodashStoreForm.isSubmitting ? "Saving..." : "Save"}
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
    demodashStoreForm: state.demodashStoreForm,
    currentAccountUser: state.dashboard.currentAccountUser
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateDemodashStoreForm: payload =>
      dispatch(updateDemodashStoreForm(payload))
  };
}

const FormCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormCard);

export default function ProfileForm(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          demodash store
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <FormCard title={"My store settings"} />
      </Flex>
    </>
  );
}
