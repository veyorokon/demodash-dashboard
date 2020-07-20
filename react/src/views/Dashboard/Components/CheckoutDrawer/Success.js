import React from "react";
import {Box, Flex, Text, Icon, CallToActionButton} from "components";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
import styled from "styled-components";
import {responsive as r} from "lib";
import {connect} from "react-redux";
import {
  toggleCheckout,
  updateDemoCheckoutForm,
  updatePanel
} from "redux/actions";

const DrawerTitle = styled(Box)`
  align-items: center;
  grid-row: 1;
  display: flex;
  z-index: 60;
  justify-content: space-between;
`;

const _Success = props => {
  const {
    demoCheckoutForm,
    lastScrollY,
    toggleCheckout,
    currentAccountUser,
    currentAccount,
    address,
    updateDemoCheckoutForm,
    updatePanel
  } = props;
  return (
    <>
      <DrawerTitle
        bg={"blues.3"}
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
            updateDemoCheckoutForm({
              ...demoCheckoutForm,
              currentPanel: 0,
              receiptUId: ""
            });
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
          <Text color={"greens.4"} fw="500" fs={"1.4rem"}>
            Order successful.
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
        <Text color={"navys.0"} ml={2} mt={4} mb={3} fs={"1.8rem"}>
          Thank you, your order has been placed.
        </Text>
        <Text color={"navys.1"} ml={2} mt={2} mb={2} fs={"1.5rem"}>
          Order: #{demoCheckoutForm.receiptUId}
        </Text>
        <Text m={2} mb={3} color={"greys.0"}>
          You'll receive an email for your order confirmation.
        </Text>
        <Text m={2} color={"navys.1"}>
          Shipping to:
        </Text>
        <Box m={2} border="1px solid #e3e3ee" br={2} p={2}>
          {currentAccountUser && (
            <Flex flexDirection="column">
              <Text mb={1}>{currentAccount.profile.name}</Text>
              <Text color="greys.0">
                {address.line1}, {address.city} {address.state} {address.zip}
              </Text>
              <Flex mt={2}>
                <Text mr={2} fs={"1.3rem"} color={"navys.0"} fw={500}>
                  Est. shipping time:
                </Text>
                <Text fs={"1.4rem"} color={"navys.0"} fw={400}>
                  2 - 3 days.
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
      <Flex
        p={2}
        bg={"blues.3"}
        w="100%"
        alignItems="center"
        justifyContent={["center", "center", "center", "flex-start"]}
      >
        <CallToActionButton
          cursor={"pointer"}
          hoverBackground={"#F87060"}
          bg={"oranges.1"}
          color={"whites.0"}
          hoverColor={"whites.0"}
          br={2}
          w={r("100% 28rem")}
          m="0 auto"
          maxWidth="100%"
          fs={"1.6rem"}
          onClick={() => {
            window.setTimeout(() => {
              const container = document.querySelector("#rightContainer");
              container.scrollTop = lastScrollY;
              window.scroll({top: lastScrollY, left: 0});
            }, 50);
            updatePanel("myDemos");
            updateDemoCheckoutForm({
              ...demoCheckoutForm,
              currentPanel: 0,
              receiptUId: ""
            });
          }}
        >
          Manage my demos
        </CallToActionButton>
      </Flex>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckout: () => dispatch(toggleCheckout()),
    updateDemoCheckoutForm: payload =>
      dispatch(updateDemoCheckoutForm(payload)),
    updatePanel: payload => dispatch(updatePanel(payload))
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
)(_Success);
