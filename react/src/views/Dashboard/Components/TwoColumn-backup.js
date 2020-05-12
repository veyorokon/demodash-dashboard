/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import React from "react";
import {Box, Flex, Text, Section, Select, Option} from "components";
import styled, {css} from "styled-components";
import {responsive as r} from "lib";

const Hide = styled(Box)`
  transition: opacity 0.4s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  display: none;
  ${props =>
    props.showing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: block;
    `}
`;

const NavigationTabItem = styled(Flex)`
  cursor: pointer;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  border-left: 3px solid transparent;
  transition: border-left 0.2s linear;
  &:hover {
    color: ${props => props.hoverColor || "white"};
  }
  ${props =>
    props.active &&
    css`
      background: #232e60;
      border-color: white;
    `}
`;

const Header = styled(Text)`
  transition: color 0.275s ease-in-out;
  outline: none;
  color: inherit;
`;

const ScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;
const LeftColumn = styled(ScrollContainer)`
  flex-grow: 20;
  height: 100vh;
  justify-content: space-around;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 0;
`;

const RightColumn = styled(ScrollContainer)`
  flex-grow: 80;
  height: 100vh;
  flex-basis: 44rem;
  overflow: auto;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;

const DropDown = styled(Select)`
  height: 3.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::select {
    appearance: none;
  }
`;

const DropOption = styled(Option)`
  height: 3.5rem;
`;

const DashNav = styled(Flex)`
  position: fixed;
  width: 100%;
  align-items: center;
`;

export default class NavigationTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected || 0
    };
  }

  getInitialState() {
    return {
      selected: this.props.selected || 0
    };
  }

  handleChange = index => {
    this.setState({selected: index});
  };

  render() {
    const {selected} = this.state;
    return (
      <Section height={"fit-content"} overflow="hidden">
        <Flex h={"100vh"}>
          <LeftColumn bg={"darkBlues.0"}>
            <Content
              h="fit-content"
              justifyContent="space-around"
              alignItems="flex-start"
              w={"27rem"}
            >
              <DropDown
                mt={3}
                mb={5}
                color={"whites.0"}
                ml={"auto"}
                mr={"auto"}
                fs={"1.6rem"}
                onChange={e => console.log(e.target.value)}
              >
                <DropOption value="0">Storefront</DropOption>
                <DropOption value="1">Brand</DropOption>
                <DropOption value="1">Cherry's Barbershop</DropOption>
                <DropOption value="2">Add Account</DropOption>
              </DropDown>
              {this.props.tabHeaders.map((elem, index) => {
                const isActive = selected === index;
                const color = isActive ? "whites.0" : "greys.5";
                return (
                  <NavigationTabItem
                    onClick={() => this.handleChange(index)}
                    key={index}
                    active={isActive}
                    mb={1}
                    p={3}
                    color={color}
                    hoverColor={"white"}
                    w={"100%"}
                  >
                    <Header ml={3} w={"100%"} fw={500}>
                      {elem}
                    </Header>
                  </NavigationTabItem>
                );
              })}
            </Content>
          </LeftColumn>
          <RightColumn
            bg={"whites.0"}
            h="fit-content"
            justifyContent="flex-start"
          >
            <DashNav bg={"greys.3"} h={5}>
              Navbar
            </DashNav>
            <Content mt={5} p={4} w={r("100%")} h="fit-content">
              {this.props.children.map((elem, index) => (
                <Hide key={index} showing={selected === index}>
                  {React.cloneElement(elem, {active: selected === index})}
                </Hide>
              ))}
            </Content>
          </RightColumn>
        </Flex>
      </Section>
    );
  }
}
