import React from "react";
import {Box, Flex, Text, DropDown} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {updateDemoCampaignForm} from "redux/actions";
import {DEMO_BOXES} from "views/Dashboard/gql";
import {responsive as r, getToken, getEventVal} from "lib";

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

class _AddCampaignForm extends React.Component {
  render() {
    const {props} = this;
    const {
      currentAccountUser,
      demoCampaignForm,
      updateDemoCampaignForm
    } = props;
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
                      demoBoxId: parseInt(getEventVal(evt))
                    });
                  }}
                  currentAccountUser={currentAccountUser}
                />
              )}
            </Flex>
          </FormGroup>
          <FormGroup mt={3} mb={r("3 ----> 2")}>
            <FlexField mt={2} mb={2} name={"Products ( lim. 3 ):"} />
            <Flex flexBasis="60%" flexDirection="column" mt={2}>
              <FlexInput placeholder="Address line 1" mb={1} />
              <FlexInput placeholder="Address line 2" mb={1} />
              <FlexInput placeholder="City" mb={1} />
              <Flex mb={2}>
                <DropDown
                  br={2}
                  maxWidth="100%"
                  w="25rem"
                  border={"1px solid lightslategrey"}
                  bg="whites.0"
                  onChange={e => console.log(e.target.value)}
                  options={[{text: "test", value: "testval"}]}
                  defaultValue={"OH"}
                />
              </Flex>
              <FlexInput placeholder="ZIP" />
            </Flex>
          </FormGroup>
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
