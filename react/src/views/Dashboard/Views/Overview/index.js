import React from "react";
// import {responsive as r} from "lib";
import {Box, Text} from "components";

export default props => {
  return (
    <>
      {[...Array(30)].map(index => {
        return (
          <Box bg={"greys.4"} key={index} w="100%" h="5rem">
            <Text>OVERVIEW</Text>
          </Box>
        );
      })}
    </>
  );
};
