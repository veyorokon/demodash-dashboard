import React from "react";
import {Box, Flex, Text, Icon, CallToActionButton} from "components";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
import styled from "styled-components";
import {responsive as r} from "lib";
import {connect} from "react-redux";
import {toggleCheckout, updateDemoCheckoutForm} from "redux/actions";

const DrawerTitle = styled(Box)`
  align-items: center;
  grid-row: 1;
  display: flex;
  z-index: 60;
  justify-content: space-between;
`;

const _Overview = props => {
  const {
    demoCheckoutForm,
    lastScrollY,
    toggleCheckout
    // updateDemoCheckoutForm
  } = props;
  const disabled = true;
  return (
    <>
      <DrawerTitle
        bg={"greys.4"}
        w={"100%"}
        pl={r("2 ----> 4")}
        pr={r("2 ----> 4")}
      >
        <Icon
          cursor="pointer"
          onClick={() => {
            toggleCheckout();
            window.setTimeout(() => {
              const container = document.querySelector("#rightContainer");
              container.scrollTop = lastScrollY;
              window.scroll({top: lastScrollY, left: 0});
            }, 50);
          }}
          justifyContent="center"
          mr={3}
          h={r("2.6rem ----> 3rem")}
        >
          <CloseOutline />
        </Icon>
        <Flex
          justifyContent="center"
          mr={r("2.6rem ----> 3rem")}
          pr={r("2 ----> 4")}
        >
          <Text fw="500" fs={"1.4rem"}>
            Success
          </Text>
        </Flex>
      </DrawerTitle>
      <Box
        pt={3}
        pb={3}
        ml="auto"
        mr="auto"
        pl={r("0 2 ---> 4")}
        pr={r("0 2 ---> 4")}
      >
        test
      </Box>
      <Flex
        p={2}
        bg={"greys.4"}
        w="100%"
        alignItems="center"
        justifyContent={["center", "center", "center", "flex-start"]}
      >
        <CallToActionButton
          disabled={disabled}
          cursor={disabled ? "no-drop" : "pointer"}
          hoverBackground={disabled ? "#ffb39f" : "#F87060"}
          bg={disabled ? "#ffb39f" : "oranges.1"}
          color={"whites.0"}
          hoverColor={disabled ? "whites.2" : "whites.0"}
          br={2}
          w={r("100% 28rem")}
          m="0 auto"
          maxWidth="100%"
          fs={"1.6rem"}
          onClick={() => console.log("here")}
        >
          {demoCheckoutForm.isSubmitting ? "Saving..." : "Place your order"}
        </CallToActionButton>
      </Flex>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckout: () => dispatch(toggleCheckout()),
    updateDemoCheckoutForm: payload => dispatch(updateDemoCheckoutForm(payload))
  };
}

const mapStateToProps = state => {
  const {demoCheckoutForm} = state;
  const {lastScrollY} = state;
  return {
    lastScrollY,
    demoCheckoutForm
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Overview);
