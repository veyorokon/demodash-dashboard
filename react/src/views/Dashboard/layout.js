import React from "react";
import {Box, Flex, Icon, Text} from "components";
import {connect} from "react-redux";
import {responsive as r} from "lib";
import styled, {css} from "styled-components";

import LogoIcon from "assets/svg/logo.js";

import {MenuOutline} from "@styled-icons/evaicons-outline/MenuOutline";

import {Drawer} from "views/_components";
import {toggleNav} from "redux/actions";

function mapDispatchToProps(dispatch) {
  return {
    toggleNav: () => dispatch(toggleNav())
  };
}

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
const ScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

const Left = styled(ScrollContainer)`
  height: 100vh;
  justify-content: space-around;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 25;
  border-right: 2px solid #ecedf1;
`;
const Right = styled(ScrollContainer)`
  flex-grow: 80;
  height: 100vh;
  flex-basis: 44rem;
  overflow: auto;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;

export function LeftColumn(props) {
  return (
    <Left {...props}>
      <Content
        h="100%"
        justifyContent="space-between"
        alignItems="flex-start"
        w={"27rem"}
        // ml={r("unset --------> 6")}
      >
        {props.children}
      </Content>
    </Left>
  );
}
const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

const LogoTitle = props => (
  <Flex flexGrow={0} alignItems="center" mr={3} {...props}>
    <Icon justifyContent="center" mr={3} h={"3rem"}>
      <LogoIcon />
    </Icon>
    <Logo as="h1" fs={r("3rem ------> 3.1rem")} color="navys.0">
      demodash
    </Logo>
  </Flex>
);

const NavWrapper = styled(Flex)`
  z-index: 50;
`;

const _NavBar = props => {
  const {toggleNav} = props;
  return (
    <NavWrapper
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      bg={"whites.0"}
      h={5}
      borderBottom="2px solid #ecedf1"
      {...props}
    >
      <Icon cursor="pointer" justifyContent="center" ml={3} mr={3} h={"3rem"}>
        <MenuOutline onClick={toggleNav} />
      </Icon>
      <LogoTitle />
    </NavWrapper>
  );
};

const NavBar = connect(
  null,
  mapDispatchToProps
)(_NavBar);

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
      ml={r("0 2 ---> 3 ---->  auto")}
      mr={r("0 2 ---> 3 ---->  auto")}
      pl={r("0 1 -------> 4")}
      pr={r("0 1 -------> 4")}
      pt={r("4")}
      pb={r("4")}
      {...props}
    >
      <FlexCol>{props.children}</FlexCol>
    </Box>
  );
};

export function RightColumn(props) {
  const {selected, navOpen} = props;
  return (
    <Right
      bg={"whites.0"}
      h="fit-content"
      justifyContent="flex-start"
      {...props}
    >
      <Content w={r("100%")} h="fit-content">
        <Drawer display={r("grid -------> none")} />
        <NavBar display={navOpen ? "none" : r("flex -------> none")} />
        {props.children.length ? (
          props.children.map((component, index) => {
            return (
              <Hide key={index} showing={selected === component.key}>
                <Layout display={navOpen ? r("none -------> block") : "block"}>
                  {component}
                </Layout>
              </Hide>
            );
          })
        ) : (
          <Hide showing={true}>{props.children}</Hide>
        )}
      </Content>
    </Right>
  );
}

const mapStateToProps = state => {
  return {selected: state.panel, navOpen: state.navOpen};
};

export const ConnectedRightColumn = connect(
  mapStateToProps,
  null
)(RightColumn);
