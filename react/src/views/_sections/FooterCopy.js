import React from "react";
import {Flex, Section, Box, Text} from "components";
import {responsive as r} from "lib";

class FooterCopy extends React.Component {
  render() {
    return (
      <Section bg={"greys.3"} height={"fit-content"} overflow="hidden">
        <Box
          m={r("4 ------> 3")}
          ml={r("2 ---> 3 -> 4 5 -> 7")}
          mr={r("2 ---> 3 -> 4 5 -> 7")}
        >
          <Flex
            justifyContent="flex-start"
            flexDirection="row"
            alignItems="center"
          >
            <Text
              lineHeight={"1.5"}
              letterSpacing={"-.2px"}
              as="p"
              fw={400}
              width={"100%"}
              fs={"1.2rem"}
              color="blacks.0"
              textAlign={r("center ------> left")}
              maxWidth="80rem"
            >
              &copy; Copyright 2020 demodash. All rights reserved.
            </Text>
          </Flex>
        </Box>
      </Section>
    );
  }
}
export default FooterCopy;
