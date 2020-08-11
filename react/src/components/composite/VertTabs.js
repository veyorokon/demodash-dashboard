/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import React from "react";
import {Box, Flex, Text} from "components";
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

const Menu = styled(Flex)`
  z-index: 10;
`;

const PanelNavigation = styled(Flex)`
  justify-content: end;
  transition: padding 0.2s;
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

const Navigation = props => {
  return <PanelNavigation {...props}>{props.children}</PanelNavigation>;
};

const Header = styled(Text)`
  transition: all 0.3s ease-in-out;
  outline: none;
  &:hover {
    color: #112237;
  }
`;

export const TabPanel = props => {
  return (
    <Flex width="100%" margin={"0 auto"} {...props}>
      {props.children}
    </Flex>
  );
};

class NavigationTabs extends React.Component {
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
    this.props.children[index].props.callBack();
    this.setState({selected: index});
  };

  render() {
    const {selected} = this.state;
    return (
      <React.Fragment>
        <Navigation
          flexDirection={r(" row")}
          w={r("100%")}
          overflow="hidden"
          bg="white"
          h={r("3.9rem")}
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
        </Navigation>
        {this.props.children.map((elem, index) => (
          <Hide key={index} showing={selected === index}>
            {elem}
          </Hide>
        ))}
      </React.Fragment>
    );
  }
}

class VertTabs extends React.Component {
  render() {
    return (
      <Menu flexDirection={r("column")} h="100%" bg="whites.0" {...this.props}>
        <NavigationTabs
          selected={this.props.selected}
          tabHeaders={this.props.tabHeaders}
          {...this.props}
        >
          {this.props.children}
        </NavigationTabs>
      </Menu>
    );
  }
}

export default VertTabs;
