import React from "react";
import {responsive as r} from "lib";
import {Box, Text, Section} from "components";
// import Hero from "./Sections/Hero";
import {Flex} from "components";
import styled from "styled-components";

//Change leftColumn to hidden component;
const LeftColumn = styled(Flex)`
  flex-grow: 20;
  height: 100vh;
  justify-content: space-around;
  border-right: 1px solid #ddd;
  flex-basis: 27rem;
  overflow: auto;

  flex-grow: 0;
`;
const RightColumn = styled(Flex)`
  flex-grow: 80;
  height: 100vh;
  flex-basis: 44rem;
  overflow: auto;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;
export default props => {
  return (
    <Section bg={"navys.4"} height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn>
          <Content
            p={4}
            h="fit-content"
            justifyContent="space-around"
            w={"27rem"}
          >
            {[...Array(10)].map(index => {
              return (
                <Flex textAlign="center" key={index} w="100%" h="5rem">
                  <Text h="fit-content">TOP</Text>
                </Flex>
              );
            })}
          </Content>
        </LeftColumn>
        <RightColumn h="fit-content" justifyContent="flex-start">
          <Content p={4} w={r("50rem --> 45rem")} h="fit-content">
            {[...Array(30)].map(index => {
              return (
                <Box key={index} w="100%" h="5rem">
                  <Text>TOP</Text>
                </Box>
              );
            })}
          </Content>
        </RightColumn>
      </Flex>
    </Section>
  );
};
