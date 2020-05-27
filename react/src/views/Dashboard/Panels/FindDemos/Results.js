import React from "react";
import {Box, Flex} from "components";
// import {responsive as r} from "lib";
import styled from "styled-components";

const ResultBox = styled(Box)`
  border-top: 2px solid #dae0e6;
`;

export default function Results(props) {
  return (
    <ResultBox bg="whites.0" w={"80rem"} minHeight="60rem" maxWidth="100%">
      <Flex alignItems="center">test</Flex>
    </ResultBox>
  );
}
