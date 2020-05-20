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
    w={r("90%")}
    hoverColor={"#6B64F6"}
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
        <Text color="currentColor" fs={"1.6rem"}>
          {props.text}
        </Text>
      )}
    </Flex>
  </NavButton>
);

const NavCategory = props => (
  <Flex w={r("16rem")} h={"4rem"} flexGrow={0} alignItems={"center"} {...props}>
    <Text fs={"1.6rem"} fw={500} cursor="default" color={"navys.1"}>
      {props.text}
    </Text>
  </Flex>
);

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn>
          <Flex w={"100%"} pt={5} pb={4} flexDirection="column">
            <DropDown
              mb={4}
              color={"navys.1"}
              useDefaultButton
              onChange={e => console.log(e.target.value)}
              options={[{text: "Cherry's Barbershop", value: "TestVal"}]}
              defaultOption={"New account"}
              onDefaultClick={() => console.log("test")}
              iconProps={{h: "2.4rem"}}
            />
            <Flex flexGrow={1} flexDirection="column">
              <NavItem
                onClick={() => console.log("her")}
                text="Home"
                icon={<Home />}
                ml={3}
              />
              <NavCategory mt={3} text={"Demos"} />
              <NavItem
                onClick={() => console.log("her")}
                text="Find demos"
                icon={<Home />}
                ml={3}
              />
              <NavItem
                onClick={() => console.log("her")}
                text="My demos"
                icon={<Home />}
                ml={3}
              />
              <NavItem
                onClick={() => console.log("her")}
                text="demodash store"
                icon={<Home />}
                ml={3}
              />
              <NavCategory mt={3} text={"Account"} />
              <NavItem
                onClick={() => console.log("her")}
                text="Billing & payout"
                icon={<Home />}
                ml={3}
              />
              <NavItem
                onClick={() => console.log("her")}
                text="Settings"
                icon={<Home />}
                ml={3}
              />
              <NavItem
                onClick={() => console.log("her")}
                text="Account users"
                icon={<Home />}
                ml={3}
              />
            </Flex>
            <Flex mt={4} flexGrow={0} w={"100%"} flexDirection="column">
              <NavItem text="Logout" icon={<LogOut />} />
            </Flex>
          </Flex>
        </LeftColumn>
        <RightColumn>
          <Hero />
        </RightColumn>
      </Flex>
    </Section>
  );
};
