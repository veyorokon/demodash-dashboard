import React from "react";
import NavButton from "./NavButton";
import {Text, Flex, Icon} from "components";
import {responsive as r} from "lib";

const NavItem = props => (
  <NavButton
    w={r("90%")}
    hoverColor={"#928ee6"}
    activeColor={"#574eff"}
    color={"navys.1"}
    onClick={props.onClick}
    {...props}
  >
    <Flex alignItems="center">
      {props.icon && (
        <Icon mr={3} h={r("2rem -------> 2.2rem")}>
          {props.icon}
        </Icon>
      )}
      {props.dash ? (
        <Text color="currentColor" fs={"1.6rem"}>
          &ndash; {props.text}
        </Text>
      ) : (
        <Text fw="inherit" color="currentColor" fs={"1.6rem"}>
          {props.text}
        </Text>
      )}
    </Flex>
  </NavButton>
);

export default NavItem;
