import React from "react";
import {Box} from "components";
import {responsive as r} from "lib";

export default function Home(props) {
  return (
    <Box
      ml={r("2 ---> 3 -> 4 5 6 -> 7")}
      mr={r("2 ---> 3 -> 4 5 6 -> 7")}
      pt={r("5 ---------> 6")}
      pb={r("5")}
    >
      <Box
        p={3}
        boxShadow="0 1px 6px rgba(57,73,76,0.35)"
        bg={"whites.0"}
        br={"5px"}
      >
        Find Demos
      </Box>
    </Box>
  );
}
