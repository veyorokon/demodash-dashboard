import React from "react";
import Hero from "./Sections/Hero";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section} from "components";
export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn>test</LeftColumn>
        <RightColumn>
          <Hero />
          <Hero />
        </RightColumn>
      </Flex>
    </Section>
  );
};
