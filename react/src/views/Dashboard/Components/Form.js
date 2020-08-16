import React from "react";
import {Input, Flex, Text, TextArea, CallToActionButton} from "components";
import {responsive as r} from "lib";

const FlexInput = props => {
  return (
    <Flex flexBasis="60%" {...props}>
      <Input
        w={"25rem"}
        h={"3.5rem"}
        fs={"1.4rem"}
        p={2}
        borderColor={props.borderColor ? props.borderColor : "lightslategrey"}
        {...props}
        {...props.inputProps}
      />
    </Flex>
  );
};

const FlexText = props => {
  return (
    <Flex mt={3} justifyContent="flex-start" alignItems="center" {...props}>
      <Text fw={"inherit"}>{props.children}</Text>
    </Flex>
  );
};

const FlexField = props => {
  return (
    <Flex
      mt={3}
      flexBasis="40%"
      justifyContent="flex-end"
      alignSelf="flex-start"
      {...props}
    >
      <Text fw={400} fs={"1.6rem"} h="fit-content" mr={3} mt="auto" mb="auto">
        {props.name}
      </Text>
    </Flex>
  );
};

const FlexTextArea = props => {
  return (
    <Flex flexBasis="60%" {...props}>
      <TextArea
        borderColor={props.borderColor ? props.borderColor : "lightslategrey"}
        minHeight={"13rem"}
        w={"25rem"}
        fs={"1.4rem"}
        p={2}
        {...props}
      />
    </Flex>
  );
};

const FormSection = props => {
  return (
    <Flex
      boxShadow={"inset 0 -1px #e3e3ee"}
      p={r("3")}
      pt={3}
      pb={3}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

const FormGroup = props => (
  <Flex
    ml={r("auto ----> initial")}
    mr={r("auto ----> initial")}
    flexDirection={r("column ----> row")}
    maxWidth="100%"
    color={"navys.1"}
    {...props}
  >
    {props.children}
  </Flex>
);

const FormButton = props => (
  <CallToActionButton
    hoverBackground="#FFC651"
    br={2}
    bg={"yellows.1"}
    w="25rem"
    maxWidth={"100%"}
    cursor={"pointer"}
    {...props}
  >
    {props.children}
  </CallToActionButton>
);

export {
  FlexText,
  FlexTextArea,
  FlexInput,
  FlexField,
  FormSection,
  FormGroup,
  FormButton
};
