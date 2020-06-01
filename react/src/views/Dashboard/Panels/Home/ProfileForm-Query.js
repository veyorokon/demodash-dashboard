import React from "react";
import {Box, Flex, Text, DropDown, CallToActionButton} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Query} from "@apollo/react-components";
import {STATES, responsive as r} from "lib";
import {getToken} from "lib";
import {connect} from "react-redux";
import {ACCOUNT_USER, ACCOUNT_CATEGORIES} from "./gql";

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
              bg="whites.0"
              onChange={e => console.log(e.target.value)}
              hiddenOption={"Select your industry"}
              // defaultValue={"HC"}
              {...props}
            />
          </Flex>
        );
      }}
    </Query>
  );
};

const AccountFormCard = props => {
  const {account} = props;
  const {address} = account.profile;
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
          <FlexInput value={account.profile.name} mt={1} />
        </FormGroup>
        <FormGroup mt={3} mb={r("3 ----> 2")}>
          <FlexField name={"Address:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <FlexInput
              value={address && address.line1}
              placeholder="Address line 1"
              mb={1}
            />
            <FlexInput
              value={address && address.line3}
              placeholder="Address line 2"
              mb={1}
            />
            <FlexInput
              value={address && address.city}
              placeholder="City"
              mb={1}
            />
            <Flex mb={2}>
              <DropDown
                br={2}
                maxWidth="100%"
                w="25rem"
                border={"1px solid lightslategrey"}
                bg="whites.0"
                onChange={e => console.log(e.target.value)}
                options={STATES}
                defaultValue={address && address.state}
              />
            </Flex>
            <FlexInput value={address && address.zip} placeholder="ZIP" />
          </Flex>
        </FormGroup>

        <FormGroup mt={2} mb={r("3 ----> 2")}>
          <FlexField name={"Industries"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <CategoryDropDown />
            <CategoryDropDown mt={2} />
            <CategoryDropDown mt={2} />
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
        <CallToActionButton
          hoverBackground="#FFC651"
          br={2}
          bg={"yellows.1"}
          w={r("100% --> 25rem -> 10rem")}
          maxWidth="100%"
          fs={"1.6rem"}
        >
          Save
        </CallToActionButton>
      </FormSection>
    </Box>
  );
};

function ProfileForm(props) {
  const {token} = getToken();
  const {currentAccountUser} = props;
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
        {currentAccountUser && (
          <Query
            query={ACCOUNT_USER}
            variables={{id: currentAccountUser, token}}
          >
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
              const {account} = data.accountUser;
              return (
                <AccountFormCard account={account} title={"Account settings"} />
              );
            }}
          </Query>
        )}
      </Flex>
    </>
  );
}

const mapNavItemStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

export default connect(
  mapNavItemStateToProps,
  null
)(ProfileForm);
