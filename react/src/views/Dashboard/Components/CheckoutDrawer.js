import React from "react";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {Grid, Box, Text, Flex, Icon} from "components";
import {withRouter} from "react-router";

// import {CallToAction} from "views/_components";

import {responsive as r} from "lib";

import LogoIcon from "assets/svg/logo.js";
import {connect} from "react-redux";
import {toggleCheckout} from "redux/actions";

import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
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
  transform-origin: bottom;

  ${props =>
    props.open
      ? css`
          height: 100%;
          z-index: 50;
          ${system({
            transform: true
          })}
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
        `
      : css`
          z-index: -1;
          transform: translate3d(0, 100vh, 0);
          height: 0;
          transition-property: transform 0.3s cubic-bezier(0.3, 0, 0, 1),
            0.3s z-index cubic-bezier(0.3, 0, 0, 1), height 0.6s;
        `};
`;

const _CheckoutDrawer = props => {
  const {
    checkoutOpen,
    toggleCheckout //currentAccountUser
  } = props;

  return (
    <DrawerContainer
      bg={"whites.0"}
      w={r("100%")}
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
          <Icon justifyContent="center" mr={3} h={"3rem"}>
            <LogoIcon />
          </Icon>
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
          cursor="pointer"
          onClick={toggleCheckout}
          justifyContent="center"
          mr={3}
          h={"3rem"}
        >
          <CloseOutline />
        </Icon>
      </DrawerTitle>
      <Text>Test</Text>
    </DrawerContainer>
  );
};

const CheckoutDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CheckoutDrawer);

export default withRouter(CheckoutDrawer);
