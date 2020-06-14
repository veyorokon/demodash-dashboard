import React from "react";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {Grid, Image, Box, Text, Flex} from "components";
import {withRouter} from "react-router";

// import {CallToAction} from "views/_components";

import {responsive as r} from "lib";

import logo from "assets/svg/logo.svg";
import {connect} from "react-redux";
import {toggleCheckout} from "redux/actions";

import close from "assets/icons/close.svg";

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckout: () => dispatch(toggleCheckout())
  };
}
const mapStateToProps = state => {
  const {checkoutOpen} = state;
  const {currentAccountUser, accountUserSet} = state.dashboard;
  return {
    checkoutOpen,
    currentAccountUser,
    accountUserSet
  };
};

const Icon = styled(Image)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const DrawerTitle = styled(Box)`
  align-items: center;
  grid-row: 1;
  display: flex;
  z-index: 60;
  justify-content: space-between;
`;
const DrawerContainer = styled(Grid)`
  position: absolute;
  top: 0;
  right: 0;
  grid-template-rows: 8rem 1fr;
  ${props =>
    props.open
      ? css`
          z-index: 50;
          ${system({
            transform: true
          })}
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
        `
      : css`
          z-index: -1;
          transition-property: transform, z-index;
          transition-duration: 0.3s;
          transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
          transform: translate3d(100vw, 0, 0);
        `};
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
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

const NavContainer = styled(ScrollContainer)`
  height: 100vh;
  justify-content: flex-start;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 25;
  border-right: 2px solid transparent;
`;

const _CheckoutDrawer = props => {
  const {
    checkoutOpen,
    toggleCheckout //currentAccountUser
  } = props;

  return (
    <DrawerContainer
      bg={"whites.0"}
      w={r("100% ---> 60% -> 50%")}
      h={"100%"}
      open={checkoutOpen}
      {...props}
    >
      <DrawerTitle w={"100%"} h={"100%"} pl={4} pr={4}>
        <Flex
          justifySelf="flex-start"
          alignItems="center"
          justifyContent="center"
          flexGrow={0}
        >
          <Image mr={3} cursor="pointer" h={"3rem"} w={"auto"} src={logo} />
          <Text
            lineHeight={"1.5"}
            as="p"
            fw={700}
            fs={"2.4rem"}
            color="navys.0"
          >
            demodash
          </Text>
        </Flex>
        <Icon
          w={"1.86rem"}
          h={"1.86rem"}
          cursor="pointer"
          src={close}
          onClick={toggleCheckout}
        />
      </DrawerTitle>
      <NavContainer ml={r("2 ---> 3")} mr={r("2 ---> 3")}>
        <Content
          h="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          w={"100%"}
        >
          test
        </Content>
      </NavContainer>
    </DrawerContainer>
  );
};

const CheckoutDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CheckoutDrawer);

export default withRouter(CheckoutDrawer);
