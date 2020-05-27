import React from "react";
import {Flex, Text} from "components";
import {responsive as r} from "lib";

const NavCategory = props => (
  <Flex w={r("16rem")} h={"4rem"} flexGrow={0} alignItems={"center"} {...props}>
    <Text fs={"1.8rem"} fw={700} cursor="default" color={"navys.1"}>
      {props.text}
    </Text>
  </Flex>
);

export default NavCategory;
