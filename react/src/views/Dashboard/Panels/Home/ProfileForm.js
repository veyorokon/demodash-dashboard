import React from "react";
import {Box, Flex, Text} from "components";
import {FlexInput, FlexField, FormSection, FormGroup} from "./Components";
import {responsive as r} from "lib";

const AccountFormCard = props => {
  return (
    <Box
      w={"80rem"}
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
          <FlexInput />
        </FormGroup>
        <FormGroup mt={3} mb={r("3 ----> 2")}>
          <FlexField name={"Address:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <FlexInput mb={2} />
            <FlexInput mb={2} />
            <FlexInput />
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
};

export default function ProfileForm(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Profile
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <AccountFormCard title={"Account settings"} />
      </Flex>
    </>
  );
}
