import React from "react";
import {Box, Flex, Text, DropDown} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {responsive as r} from "lib";

const DemoBoxFormCard = props => {
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
          <FlexField mt={2} name={"Choose a product:"} />
          <Flex flexBasis="60%">
            <DropDown
              options={[{text: "test", value: "val"}]}
              br={2}
              maxWidth="100%"
              w="25rem"
              border={"1px solid lightslategrey"}
              hiddenOption={"Add a product"}
            />
          </Flex>
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Demo box price:"} />
          <FlexInput mt={1} />
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Refill price:"} />
          <FlexInput mt={1} />
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Shipping price:"} />
          <FlexInput mt={1} />
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
    <Flex mb={4} justifyContent="center">
      <DemoBoxFormCard title={"Create a box"} />
    </Flex>
  );
}
