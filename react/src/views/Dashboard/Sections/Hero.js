import React from "react";
import {Flex, Section, Box, Text} from "components";
import {responsive as r} from "lib";

class Hero extends React.Component {
  render() {
    return (
      <Section bg={"whites.0"} height={"fit-content"} overflow="hidden">
        <Box
          ml={r("2 ---> 3 -> 4 5 6 -> 7")}
          mr={r("2 ---> 3 -> 4 5 6 -> 7")}
          pt={r("5 ---------> 6")}
          pb={r("5")}
        >
          <Flex
            justifyContent="flex-start"
            flexDirection="column"
            alignItems="center"
          >
            <Text
              textAlign="center"
              lineHeight={"1.5"}
              as="h2"
              fw={r("600")}
              fs={r("2.8rem --> 3rem ---> 3.4rem")}
              color="navys.0"
              mb={2}
              letterSpacing={"-.8px"}
            >
              Demos get users
            </Text>
            <Text
              mt={3}
              lineHeight={"1.5"}
              letterSpacing={"-.2px"}
              as="p"
              fw={300}
              fs={r("2rem -----> 2.2rem")}
              color="navys.2"
              textAlign="center"
              maxWidth="80rem"
            >
              Scale your business from demo to dropshipping and handle
              everything in between like payment processing and commission - on
              one platform.
            </Text>
          </Flex>
        </Box>
      </Section>
    );
  }
}
export default Hero;
