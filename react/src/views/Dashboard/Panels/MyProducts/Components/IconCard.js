import React from "react";
import {Box, Flex, Text, Icon as IconFlex} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";

const IconCircle = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Icon = props => {
  return (
    <IconCircle
      w={r("4rem --------> 4.5rem")}
      h={r("4rem --------> 4.5rem")}
      mb={3}
      {...props}
    >
      <IconFlex w="fit-content" h={r("2rem -------> 2.2rem")}>
        {props.icon}
      </IconFlex>
    </IconCircle>
  );
};

export default props => {
  return (
    <Box
      p={3}
      pb={4}
      pt={4}
      w={r("20rem --------> 23rem")}
      boxShadow="0 1px 6px rgba(57,73,76,0.35)"
      bg={"whites.0"}
      br={"3px"}
      {...props}
    >
      <Icon icon={props.icon} {...props.iconProps} />
      <Text ml="auto" mr="auto" w={"100%"} fs={"3.6rem"} fw={800}>
        {props.value}
      </Text>
      <Text
        letterSpacing="0.5px"
        color={"navys.2"}
        mb={3}
        fw={300}
        ml="auto"
        mr="auto"
        w={"100%"}
      >
        {props.title}
      </Text>
    </Box>
  );
};
