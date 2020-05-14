import React from "react";
// import {responsive as r} from "lib";
import Hero from "./Sections/Hero";
import {Box, Text} from "components";

export default props => {
  return (
    <>
      <Hero />
      {[...Array(10)].map(index => {
        return (
          <Box key={index} w="100%" h="5rem">
            <Text>DEMOS</Text>
          </Box>
        );
      })}
    </>
  );
};
