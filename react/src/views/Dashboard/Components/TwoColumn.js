/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import React from "react";
import {Box, Flex, Text, Section} from "components";
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
  padding: 1.75rem 0;
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;
  transition: border-color 0.275s ease;
  border-width: 2px;
  border-style: solid;
  border-color: unset;
  border-radius: 8px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  ${props =>
    props.borderColor &&
    css`
      border-color: ${props.borderColor};
    `}
`;

const Header = styled(Text)`
  transition: all 0.3s ease-in-out;
  outline: none;
  &:hover {
    color: #112237;
  }
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
      <Section bg={"navys.4"} height={"fit-content"} overflow="hidden">
        <Flex h={"100vh"}>
          <LeftColumn>
            <Content
              p={4}
              h="fit-content"
              justifyContent="space-around"
              w={"27rem"}
            >
              {this.props.tabHeaders.map((elem, index) => {
                const isActive = selected === index;
                const color = isActive ? "navys.0" : "greys.0";
                const borderColor = isActive ? "#ED8A70" : "none";
                return (
                  <NavigationTabItem
                    borderColor={borderColor}
                    onClick={() => this.handleChange(index)}
                    color={"whites.0"}
                    key={index}
                    active={isActive}
                    mr={1}
                  >
                    <Header fw={500} color={color}>
                      {elem}
                    </Header>
                  </NavigationTabItem>
                );
              })}
            </Content>
          </LeftColumn>
          <RightColumn h="fit-content" justifyContent="flex-start">
            <Content p={4} w={r("100%")} h="fit-content">
              {this.props.children.map((elem, index) => (
                <Hide key={index} showing={selected === index}>
                  {elem}
                </Hide>
              ))}
            </Content>
          </RightColumn>
        </Flex>
      </Section>
    );
  }
}
