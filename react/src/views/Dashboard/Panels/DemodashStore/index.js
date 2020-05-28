import React from "react";
import StoreForm from "./StoreForm";
import {Flex, Box} from "components";

import {responsive as r} from "lib";
const FlexCol = props => {
  return (
    <Flex
      w="fit-content"
      maxWidth="100%"
      m="auto"
      flexDirection="column"
      {...props}
    >
      {props.children}
    </Flex>
  );
};

const Layout = props => {
  return (
    <Box
      ml={r("2 ----> 3 ---->  auto")}
      mr={r("2 ----> 3 ---->  auto")}
      pl={r("1 ----> 4")}
      pr={r("1 ----> 4")}
      pt={r("5")}
      pb={r("5")}
    >
      <FlexCol>{props.children}</FlexCol>
    </Box>
  );
};
export default function Home(props) {
  return (
    <Layout>
      <StoreForm />
    </Layout>
  );
}
