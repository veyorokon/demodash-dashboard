import React from "react";
import Hero from "./Sections/Hero";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section, Button, Text, Image, DropDown} from "components";
import home from "assets/svg/dashboard/home.svg";

import styled, {css} from "styled-components";

const NavButton = styled(Button)`
  background: transparent;
  display: flex;
  height: 6rem;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  border: unset;
  /* border-left: 3px solid transparent;
  transition: border-left 0.2s linear; */
  outline: none;
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
  <NavButton onClick={props.onClick}>
    <Flex>
      <Image mr={3} src={props.icon} h={3} />
      <Text>{props.text}</Text>
    </Flex>
  </NavButton>
);

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn>
          <DropDown
            color={"navys.1"}
            useDefaultButton
            onChange={e => console.log(e.target.value)}
            options={[{text: "test", value: "value"}]}
            defaultOption={"New account"}
            onDefaultClick={() => console.log("test")}
          />
          <Flex w={"100%"} flexDirection="column">
            <NavItem
              onClick={() => console.log("her")}
              text="Test"
              icon={home}
            />
            <NavItem text="Test" icon={home} />
            <NavItem text="Test" icon={home} />
            <NavItem text="Test" icon={home} />
          </Flex>
          <Flex flexGrow={0} w={"100%"} flexDirection="column">
            <NavItem text="Logout" icon={home} />
          </Flex>
        </LeftColumn>
        <RightColumn>
          <Hero />
        </RightColumn>
      </Flex>
    </Section>
  );
};
