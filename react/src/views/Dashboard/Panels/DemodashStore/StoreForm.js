import React from "react";
import {Box, Flex, Text} from "components";
import {
  FlexInput,
  FlexField,
  FlexTextArea,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {responsive as r} from "lib";

const FormCard = props => {
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
          <FlexField name={"Store handle:"} />
          <Flex mt={1} flexBasis="60%" flexDirection="column">
            <FlexInput placeholder="demodash.com/s/..." />
            <Text ml={2} color="navys.2">
              demodash.com/s/...
            </Text>
          </Flex>
        </FormGroup>
        <FormGroup mt={3} mb={r("3 ----> 2")}>
          <FlexField name={"Store name:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <FlexInput />
          </Flex>
        </FormGroup>
        <FormGroup mt={3} mb={r("3 ----> 2")}>
          <FlexField name={"Store description:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <FlexTextArea />
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
          demodash store
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <FormCard title={"My store settings"} />
      </Flex>
    </>
  );
}
