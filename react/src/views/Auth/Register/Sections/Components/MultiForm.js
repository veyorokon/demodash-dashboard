/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import React from "react";
import {Box, Flex, Text, Button} from "components";
import styled, {css} from "styled-components";

const SubmitButton = styled(Button)`
  cursor: pointer;
  height: 5rem;
  width: 100%;
  border: none;
  outline: none;
  letter-spacing: 0.2px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${props => props.hoverColor || "black"};
    background: ${props => props.hoverBg || "none"};
  }
`;

const Menu = styled(Flex)`
  z-index: 10;
  max-width: 100%;
  transition: margin 0.2s;
  flex-direction: column;
  justify-content: space-between;
`;

const Hide = styled(Box)`
  transition: opacity 0.8s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  max-height: fit-content;
  ${props =>
    props.showing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
    `}
  ${props =>
    !props.showing &&
    css`
      display: none;
    `}
`;

const NavigationBullet = styled(Button)`
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;
  height: 1.4rem;
  width: 1.4rem;
  background: grey;
  border-radius: 50%;
  border: unset;
  ${props =>
    props.active &&
    css`
      color: black;
      font-weight: 600;
      background: black;
    `}
`;

const PanelNavigation = styled(Flex)`
  width: fit-content;
  align-self: center;
  color: black;
  order: 1;
  & > ${NavigationBullet} {
    margin-right: 2rem;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

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
    this.props.callbacks[index - 1]();
    this.setState({selected: index});
  };

  render() {
    const {selected} = this.state;
    return (
      <>
        {this.props.children.map((elem, index) => (
          <Hide flexGrow={0} key={index} showing={selected === index}>
            {elem}
          </Hide>
        ))}

        <Box>
          <SubmitButton
            hoverBg="#173bd0"
            minHeight="5rem"
            mt={4}
            mb={3}
            br={3}
            bg={"blues.0"}
            onClick={() => this.handleChange(selected + 1)}
            color={"blacks.0"}
          >
            <Text fw={600} ml="auto" mr="auto" color="whites.0" fs={"1.6rem"}>
              {this.props.buttonText[selected]}
            </Text>
          </SubmitButton>
          <PanelNavigation ml="auto" mr="auto" mb={3}>
            {this.props.showBullets &&
              this.props.children.map((elem, index) => (
                <NavigationBullet
                  p={2}
                  alignItems="center"
                  justifyContent="center"
                  h="fit-content"
                  onClick={() => this.handleChange(index)}
                  color={"blacks.0"}
                  key={index}
                  active={selected === index}
                />
              ))}
          </PanelNavigation>
        </Box>
      </>
    );
  }
}

class MultiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  render() {
    return (
      <Menu {...this.props}>
        <NavigationTabs selected={this.props.selected || 0} {...this.props} />
      </Menu>
    );
  }
}

export default MultiForm;
