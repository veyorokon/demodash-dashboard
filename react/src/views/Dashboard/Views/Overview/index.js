import React from "react";
// import Hero from "./Sections/Hero";
import {Flex} from "components";
import styled from "styled-components";

const LeftPanel = styled(Flex)`
  width: 24rem;
  flex-direction: column;
`;
const RightPanel = styled(Flex)`
  width: 100%;
  flex-direction: column;
`;

const Container = styled(Flex)`
  position: relative;
`;
export default props => {
  return (
    <Container>
      <LeftPanel overflow="auto">left</LeftPanel>
      <RightPanel overflow="auto">right</RightPanel>
    </Container>
  );
};
