import React from "react";
import {Grid, Box, Text, Icon} from "components";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {withRouter} from "react-router";

// import {CallToAction} from "views/_components";

import {responsive as r} from "lib";

import {connect} from "react-redux";
import {toggleCheckout} from "redux/actions";

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
          transition: transform 0.5s cubic-bezier(0.3, 0, 0, 1),
            0.3s z-index cubic-bezier(0.3, 0, 0, 1), height 0.2s;
        `
      : css`
          z-index: -1;
          transform: translate3d(0, 100vh, 0);
          height: 0;
          transition: transform 0.3s cubic-bezier(0.3, 0, 0, 1),
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
      mr={"1px"}
      open={checkoutOpen}
      {...props}
    >
      <DrawerTitle w={"100%"} pl={r("2 ----> 4")} pr={r("2 ----> 4")}>
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
      <Box>
        <Text display="inline-block">Test</Text>
      </Box>
    </DrawerContainer>
  );
};

const CheckoutDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CheckoutDrawer);

export default withRouter(CheckoutDrawer);
