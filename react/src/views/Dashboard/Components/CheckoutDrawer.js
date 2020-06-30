import React from "react";
import {
  Grid,
  Box,
  Flex,
  Text,
  Icon,
  DropDown,
  CallToActionButton
} from "components";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {withRouter} from "react-router";
import {Query} from "@apollo/react-components";

import {ACCOUNT_CARD_SET, OPEN_DEMO_CAMPAIGN} from "views/Dashboard/gql";
import {API_MEDIA} from "api";
// import {CallToAction} from "views/_components";

import {responsive as r, getToken} from "lib";

import {connect} from "react-redux";
import {toggleCheckout} from "redux/actions";

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
          grid-template-rows: 8rem minmax(35rem, min-content) 8rem 1fr;
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
          grid-template-rows: 0 0 0 0;
          transition: transform 0.5s cubic-bezier(0.2, 0, 0, 1),
            0.2s z-index cubic-bezier(0.1, 0, 0, 1), height 0.2s;
        `};
`;
const BackgroundImage = styled(Box)`
  background: url(${props => props.image});
  width: 10rem;
  min-width: 10rem;
  height: 10rem;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
`;
class CheckoutCard extends React.Component {
  render() {
    const {props} = this;
    const {demoCommissions} = props;
    return (
      <Flex
        flexGrow={0}
        p={1}
        pb={2}
        mt={2}
        bg={"whites.0"}
        h={"fit-content"}
        minHeight={"fit-content"}
        w="100%"
        maxWidth="100%"
        br={2}
        alignItems="flex-start"
        borderBottom="1px solid #e3e3ee"
        {...props}
      >
        <BackgroundImage
          mr={2}
          br={1}
          image={API_MEDIA + props.images[0].image}
        />
        <Box w={"fit-content"}>
          <Text mb={2} fs={"1.3rem"} color={"navys.0"} fw={500}>
            Box includes:
          </Text>
          {demoCommissions &&
            demoCommissions.length &&
            demoCommissions.map((demoCommission, indx) => {
              const {product} = demoCommission.demoBoxItem;
              return (
                <Text
                  key={indx}
                  mt={1}
                  ml={2}
                  color={"navys.1"}
                  mb={1}
                  w={"100%"}
                >
                  - {product.name}
                </Text>
              );
            })}
        </Box>
      </Flex>
    );
  }
}

class CardPaymentDropdown extends React.Component {
  cardOptions(accountCardSet) {
    let options = [];
    let defaultOption = 0;
    for (let i in accountCardSet) {
      const card = accountCardSet[i];
      if (card.isDefault) defaultOption = card.id;
      options.push({text: `${card.brand}: *${card.lastFour}`, value: card.id});
    }
    return [options, defaultOption];
  }

  render() {
    const {props} = this;
    const {currentAccountUser} = props;
    return (
      <Query
        query={ACCOUNT_CARD_SET}
        variables={{
          token: getToken().token,
          accountUserId: parseInt(currentAccountUser)
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
          const {accountCardSet} = data;
          const cardOptions = this.cardOptions(accountCardSet);
          return (
            <Flex>
              <DropDown
                options={cardOptions[0]}
                value={cardOptions[1]}
                br={2}
                maxWidth="100%"
                w="28rem"
                border={"1px solid lightslategrey"}
                hiddenOption={"Select a card for payment"}
                {...props}
              />
            </Flex>
          );
        }}
      </Query>
    );
  }
}

const _CheckoutDrawer = props => {
  const {
    checkoutOpen,
    lastScrollY,
    demoCheckoutForm,
    toggleCheckout,
    currentAccountUser
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
                <Box h="3.5rem" mb={4}>
                  <Text>Loading...</Text>
                </Box>
              );
            if (error)
              return (
                <Box h="3.5rem" mb={4}>
                  <Text>Error! {error.message}</Text>
                </Box>
              );
            const {openDemoCampaign} = data;
            console.log(openDemoCampaign);
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
                        const container = document.querySelector(
                          "#rightContainer"
                        );
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
                      Order: {openDemoCampaign.demoBox.name}
                    </Text>
                  </Flex>
                </DrawerTitle>
                <>
                  <Box
                    pt={3}
                    pb={3}
                    ml="auto"
                    mr="auto"
                    pl={r("0 2 ---> 4")}
                    pr={r("0 2 ---> 4")}
                  >
                    <CheckoutCard
                      brand={
                        (openDemoCampaign.account.profile &&
                          openDemoCampaign.account.profile.name) ||
                        null
                      }
                      title={openDemoCampaign.name}
                      demoCommissions={openDemoCampaign.demoCommissions}
                      images={openDemoCampaign.demoBox.images}
                    />
                    <Flex
                      flexDirection={r("column --> row")}
                      pt={1}
                      mt={3}
                      pl={2}
                      w="fit-content"
                    >
                      <Box mb={2} w="6rem" mr={r("4 --> 5 ---> 6")}>
                        <Text fw={500} color={"navys.2"} mt={2}>
                          Payment:
                        </Text>
                      </Box>
                      <CardPaymentDropdown
                        onChange={evt => console.log(evt.target.value)}
                        currentAccountUser={currentAccountUser}
                      />
                    </Flex>

                    <Flex
                      flexDirection={r("column --> row")}
                      pt={1}
                      mt={3}
                      pl={2}
                      w="fit-content"
                    >
                      <Box mb={2} w="6rem" mr={r("4 --> 5 ---> 6")}>
                        <Text fw={500} color={"navys.2"} mt={2}>
                          Ship to:
                        </Text>
                      </Box>
                      <Flex flexDirection="column">
                        <Text mb={2}>Vahid Eyorokon</Text>
                        <Text color="greys.0">
                          8412 Paul Drive, West Chester OH 45069
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex pt={1} mt={3} pl={2} w="fit-content">
                      <Box mb={2} w="6rem" mr={r("4 --> 5 ---> 6")}>
                        <Text fw={500} color={"navys.2"} mt={2}>
                          Total:
                        </Text>
                      </Box>
                      <Text fw={600} color="reds.1" mt={2}>
                        $
                        {(
                          openDemoCampaign.demoBox.price +
                          openDemoCampaign.demoBox.shippingPrice
                        ).toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                  <Flex
                    p={2}
                    bg={"greys.4"}
                    w="100%"
                    alignItems="center"
                    justifyContent={[
                      "center",
                      "center",
                      "center",
                      "flex-start"
                    ]}
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
                      {demoCheckoutForm.isSubmitting
                        ? "Saving..."
                        : "Place your order"}
                    </CallToActionButton>
                  </Flex>
                </>
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
          <Box>None</Box>
        </>
      )}
    </DrawerContainer>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckout: () => dispatch(toggleCheckout())
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

const CheckoutDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CheckoutDrawer);

export default withRouter(CheckoutDrawer);
