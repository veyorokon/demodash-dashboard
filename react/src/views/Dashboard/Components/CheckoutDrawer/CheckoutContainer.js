import React from "react";
import {Query} from "@apollo/react-components";
import {Grid, Box, Flex, Text, Icon} from "components";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {OPEN_DEMO_CAMPAIGN} from "views/Dashboard/gql";
import {responsive as r, getToken} from "lib";
import {connect} from "react-redux";
import {toggleCheckout, updateDemoCheckoutForm} from "redux/actions";

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
  transform-origin: bottom;
  backface-visibility: hidden;

  ${props =>
    props.open
      ? css`
          height: 100%;
          z-index: 1;
          grid-template-rows: 8rem minmax(35rem, min-content) 8rem;
          ${system({
            transform: true
          })}
          transition: transform 0.8s cubic-bezier(0.3, 0, 0, 1),
            0.3s z-index cubic-bezier(0.3, 0, 0, 1), height 0.2s;
        `
      : css`
          z-index: -1;
          transform: translate3d(0, 100vh, 0);
          height: 0;
          grid-template-rows: 0 0 0 0;
          transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1),
            0.2s z-index cubic-bezier(0.1, 0, 0, 1), height 0.2s;
        `};
`;

const _CheckoutDrawer = props => {
  const {
    checkoutOpen,
    lastScrollY,
    demoCheckoutForm,
    toggleCheckout,
    currentAccountUser,
    accountUserSet
  } = props;
  const {disabled} = demoCheckoutForm;

  return (
    <DrawerContainer
      bg={"whites.0"}
      w={r("100%")}
      h={"100%"}
      mr={"1px"}
      open={checkoutOpen}
      {...props}
    >
      {demoCheckoutForm.demoCampaignId ? (
        <Query
          query={OPEN_DEMO_CAMPAIGN}
          variables={{
            token: getToken().token,
            demoCampaignId: parseInt(demoCheckoutForm.demoCampaignId)
          }}
        >
          {({loading, error, data}) => {
            if (loading)
              return (
                <Box h="3.5rem">
                  <Text>Loading...</Text>
                </Box>
              );
            if (error)
              return (
                <Box h="3.5rem">
                  <Text>Error! {error.message}</Text>
                </Box>
              );
            const {openDemoCampaign} = data;
            const currentAccount = accountUserSet.filter(
              option => option.id === currentAccountUser
            )[0].account;
            const {address} = currentAccount.profile;
            return (
              <>
                {React.cloneElement(props.children, {
                  address: address,
                  openDemoCampaign: openDemoCampaign,
                  currentAccount: currentAccount,
                  disabled: disabled,
                  ...props
                })}
              </>
            );
          }}
        </Query>
      ) : (
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
              No demobox selected
            </Flex>
          </DrawerTitle>
        </>
      )}
    </DrawerContainer>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckout: () => dispatch(toggleCheckout()),
    updateDemoCheckoutForm: payload => dispatch(updateDemoCheckoutForm(payload))
  };
}

const mapStateToProps = state => {
  const {checkoutOpen, demoCheckoutForm} = state;
  const {currentAccountUser, accountUserSet} = state.dashboard;
  const {lastScrollY} = state;
  return {
    checkoutOpen,
    currentAccountUser,
    accountUserSet,
    lastScrollY,
    demoCheckoutForm
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_CheckoutDrawer);
