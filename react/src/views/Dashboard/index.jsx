import React from "react";
import Hero from "./Sections/Hero";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section, Button, Text, Icon, DropDown} from "components";
import {Home} from "@styled-icons/boxicons-solid/Home";
import {LogOut} from "@styled-icons/boxicons-regular/LogOut";
import {responsive as r} from "lib";
import styled, {css} from "styled-components";

const NavButton = styled(Button)`
  background: transparent;
  display: flex;
  height: 4rem;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  border: unset;
  /* border-left: 3px solid transparent;
  transition: border-left 0.2s linear; */
  outline: none;
  transition: unset;
  &:hover {
    color: ${props => props.hoverColor || "white"};
  }
  ${props =>
    props.active &&
    css`
      background: #232e60;
      /* border-color: white; */
    `}
`;

const NavItem = props => (
  <NavButton
    w={r("16rem")}
    hoverColor={"#6B64F6"}
    color={"navys.1"}
    onClick={props.onClick}
  >
    <Flex alignItems="center">
      <Icon mr={3} h={r("2rem -------> 2.2rem")}>
        {props.icon}
      </Icon>
      <Text color="currentColor" fs={"1.6rem"}>
        {props.text}
      </Text>
    </Flex>
  </NavButton>
);

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn pt={5} pb={4}>
          <DropDown
            mb={4}
            color={"navys.1"}
            useDefaultButton
            onChange={e => console.log(e.target.value)}
            options={[{text: "Test", value: "TestVal"}]}
            defaultOption={"New account"}
            onDefaultClick={() => console.log("test")}
            iconProps={{h: "2.4rem"}}
          />
          <Flex w={"100%"} flexDirection="column">
            <NavItem
              onClick={() => console.log("her")}
              text="Test"
              icon={<Home />}
            />
          </Flex>
          <Flex mt={4} flexGrow={0} w={"100%"} flexDirection="column">
            <NavItem text="Logout" icon={<LogOut />} />
          </Flex>
        </LeftColumn>
        <RightColumn>
          <Hero />
        </RightColumn>
      </Flex>
    </Section>
  );
};
