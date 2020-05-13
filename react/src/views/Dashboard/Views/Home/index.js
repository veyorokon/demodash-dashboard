import React from "react";
// import {responsive as r} from "lib";
import {Box, Text} from "components";
import styled from "styled-components";

const BoxShadow = styled(Box)`
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.12),
    0 3px 6px 0 rgba(0, 0, 0, 0.12);
`;

const WelcomeBox = props => {
  return (
    <BoxShadow p={4} bg={"whites.0"} w="100%" h="22rem" br={"4px"}>
      <Text fs={"1.8rem"}>Welcome, Kevin Cherry</Text>
    </BoxShadow>
  );
};

export default props => {
  return (
    <>
      <WelcomeBox />
    </>
  );
};
