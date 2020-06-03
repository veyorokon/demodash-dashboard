import React from "react";
import {Box, Flex, Text, CallToActionButton, Icon} from "components";
import {
  FlexInput,
  FlexField,
  FlexTextArea,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
import {Delete} from "@styled-icons/material/Delete";
import {AddCircle} from "@styled-icons/material/AddCircle";

import {responsive as r} from "lib";

const FormButton = props => (
  <CallToActionButton
    hoverBackground="#FFC651"
    br={2}
    mt={2}
    mb={2}
    bg={"yellows.1"}
    w="25rem"
    maxWidth={"100%"}
    cursor={"pointer"}
    {...props}
  >
    {props.children}{" "}
  </CallToActionButton>
);

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
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Product name:"} />
          <FlexInput mt={1} />
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Description:"} />
          <FlexTextArea placeholder="About your product..." mt={1} />
        </FormGroup>
        <FormGroup mb={r("3 ----> 2")}>
          <FlexField name={"Variations:"} mb={2} />
          <Flex flexBasis="60%" flexDirection="column" h="fit-content">
            <Flex flexDirection="column" h="fit-content">
              <Text mb={1} mt={2}>
                Variation name
              </Text>
              <FlexInput placeholder="Color, size etc." />
              <Text mb={1} mt={2}>
                Variation choices (one per line)
              </Text>
              <FlexTextArea placeholder="Variation choices..." />
              <FormButton>
                <Flex alignItems="center">
                  <Icon ml={3} mr={2} h={"2.2rem"}>
                    <Delete />
                  </Icon>
                  <Text ml={4}>Delete variation</Text>
                </Flex>
              </FormButton>
            </Flex>
            <Flex flexDirection="column" h="fit-content">
              <FormButton mt={4}>
                <Flex alignItems="center">
                  <Icon ml={3} mr={2} h={"2.2rem"}>
                    <AddCircle />
                  </Icon>
                  <Text ml={4}>Add variation</Text>
                </Flex>
              </FormButton>
            </Flex>
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

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <FormCard title={"Add a product"} />
    </Flex>
  );
};
