import React from "react";
import {Box, Flex, Text} from "components";
import {
  FlexInput,
  FlexField,
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
          <FlexField name={"Routing number:"} />
          <FlexInput mt={1} />
        </FormGroup>
        <FormGroup mt={2}>
          <FlexField name={"Account number:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <FlexInput />
          </Flex>
        </FormGroup>
        <FormGroup mt={2} mb={r("3 ----> 2")}>
          <FlexField name={"Verify account number:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
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

export default function PayoutForm(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Billing
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <FormCard title={"Add a card"} />
      </Flex>
    </>
  );
}
