import React from "react";
import {Mutation, Query} from "@apollo/react-components";
import {Box, Flex, Text, Icon, CallToActionButton} from "components";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";
import {LeftArrow} from "@styled-icons/boxicons-solid/LeftArrow";

import styled from "styled-components";
import {
  ACCOUNT_CARD_SET,
  CREATE_ACCOUNT_USER_PURCHASE,
  MY_DEMO_BOXES
} from "views/Dashboard/gql";
import {API_MEDIA} from "api";
import {responsive as r, getToken, formatGQLErrorMessage} from "lib";
import {connect} from "react-redux";
import {toggleCheckout, updateDemoCheckoutForm} from "redux/actions";

const DrawerTitle = styled(Box)`
  align-items: center;
  grid-row: 1;
  display: flex;
  z-index: 60;
  justify-content: space-between;
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
          const value = props.currentValue || cardOptions[1];
          const selected = cardOptions[0].filter(function(el) {
            return el.value === parseInt(value);
          })[0];
          return (
            <Flex>
              <Text>{selected && selected.text}</Text>
            </Flex>
          );
        }}
      </Query>
    );
  }
}

class _Overview extends React.Component {
  async createAccountUserPurchaseMutation(createAccountUserPurchase) {
    const {
      demoCheckoutForm,
      currentAccountUser,
      updateDemoCheckoutForm
    } = this.props;
    let flatForm = {...demoCheckoutForm};

    updateDemoCheckoutForm({
      ...demoCheckoutForm,
      isSubmitting: true,
      disabled: true
    });

    let checkoutForm = {
      token: getToken().token,
      accountUserId: parseInt(currentAccountUser),
      accountCardId: flatForm.accountCardId,
      cartCheckouts: [
        {
          sellerAccountId: flatForm.sellerAccountId,
          checkoutItems: [
            {
              demoBoxId: flatForm.demoBoxId,
              demoCampaignId: flatForm.demoCampaignId,
              quantity: 1
            }
          ]
        }
      ]
    };
    try {
      const response = await createAccountUserPurchase({
        variables: checkoutForm
      });
      const data = response.data.createAccountUserPurchase;
      return updateDemoCheckoutForm({
        ...demoCheckoutForm,
        receiptUId: data.purchase.receipt.uid,
        isSubmitting: false,
        disabled: false,
        currentPanel: demoCheckoutForm.currentPanel + 1
      });
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      return updateDemoCheckoutForm({
        ...demoCheckoutForm,
        ...gqlError,
        isSubmitting: false,
        disabled: true
      });
    }
  }

  render() {
    const {props} = this;
    const {
      demoCheckoutForm,
      lastScrollY,
      openDemoCampaign,
      currentAccountUser,
      address,
      disabled,
      currentAccount,
      toggleCheckout,
      updateDemoCheckoutForm
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
            <Text fw="500" fs={"1.4rem"}>
              Confirm your order
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
            pt={3}
            mt={1}
            pl={2}
            w="100%"
            pb={3}
            mb={1}
            borderBottom="1px solid #e3e3ee"
            justifyContent="space-between"
          >
            <Box mb={2} w="6rem" mr={r("4 --> 5 ---> 6")}>
              <Text fw={500} color={"navys.2"} mt={2}>
                Payment:
              </Text>
            </Box>
            <Box m={2} border="1px solid #e3e3ee" br={2} p={2}>
              <CardPaymentDropdown
                currentValue={demoCheckoutForm.accountCardId}
                currentAccountUser={currentAccountUser}
              />
            </Box>
          </Flex>
          <Flex
            flexDirection={r("column --> row")}
            pt={3}
            mt={1}
            pl={2}
            w="100%"
            pb={3}
            mb={1}
            borderBottom="1px solid #e3e3ee"
            justifyContent="space-between"
          >
            <Box mb={2} w="6rem" mr={r("4 --> 5 ---> 6")}>
              <Text fw={500} color={"navys.2"} mt={2}>
                Ship to:
              </Text>
            </Box>
            <Box m={2} border="1px solid #e3e3ee" br={2} p={2}>
              {currentAccountUser && (
                <Flex flexDirection="column">
                  <Text mb={1}>{currentAccount.profile.name}</Text>
                  <Text color="greys.0">
                    {address.line1}, {address.city} {address.state}{" "}
                    {address.zip}
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
          </Flex>

          <Flex
            flexDirection={r("column --> row")}
            pt={3}
            mt={1}
            pl={2}
            w="100%"
            pb={3}
            mb={1}
            borderBottom="1px solid #e3e3ee"
            justifyContent="space-between"
          >
            <Box mb={2} w="6rem" mr={r("4 --> 5 ---> 6")}>
              <Text fw={500} color={"navys.2"} mt={2}>
                Total:
              </Text>
            </Box>
            <Text fw={600} color="reds.1" mt={2}>
              $
              {demoCheckoutForm.isRefill
                ? (
                    openDemoCampaign.demoBox.refillPrice +
                    openDemoCampaign.demoBox.shippingPrice
                  ).toFixed(2)
                : (
                    openDemoCampaign.demoBox.price +
                    openDemoCampaign.demoBox.shippingPrice
                  ).toFixed(2)}
            </Text>
          </Flex>
        </Box>
        <Flex
          p={2}
          bg={"blues.3"}
          w="100%"
          alignItems="center"
          justifyContent={["center", "center", "center", "flex-start"]}
        >
          <Flex justifyContent="center" alignItems="center">
            <CallToActionButton
              p={1}
              disabled={disabled}
              cursor={disabled ? "no-drop" : "pointer"}
              hoverBackground={"#FFC651"}
              bg={"#F7D590"}
              color={"blacks.2"}
              hoverColor={"blacks.2"}
              br={2}
              w={r("4rem")}
              maxWidth="100%"
              mr={2}
              fs={"1.6rem"}
              onClick={() =>
                updateDemoCheckoutForm({
                  ...demoCheckoutForm,
                  currentPanel: demoCheckoutForm.currentPanel - 1
                })
              }
            >
              <Icon cursor="pointer" justifyContent="center" h={r("1.4rem")}>
                <LeftArrow />
              </Icon>
            </CallToActionButton>

            <Mutation
              mutation={CREATE_ACCOUNT_USER_PURCHASE}
              refetchQueries={[
                {
                  query: MY_DEMO_BOXES,
                  variables: {
                    token: getToken().token,
                    accountUserId: parseInt(currentAccountUser)
                  }
                }
              ]}
            >
              {createAccountUserPurchase => (
                <CallToActionButton
                  disabled={disabled}
                  cursor={disabled ? "no-drop" : "pointer"}
                  hoverBackground={disabled ? "#ffb39f" : "#F87060"}
                  bg={disabled ? "#ffb39f" : "oranges.1"}
                  color={"whites.0"}
                  hoverColor={disabled ? "whites.2" : "whites.0"}
                  br={2}
                  w={r("100% 23rem")}
                  maxWidth="100%"
                  fs={"1.6rem"}
                  onClick={() => {
                    this.createAccountUserPurchaseMutation(
                      createAccountUserPurchase
                    );
                  }}
                >
                  {demoCheckoutForm.isSubmitting
                    ? "Ordering..."
                    : "Place your order"}
                </CallToActionButton>
              )}
            </Mutation>
          </Flex>
        </Flex>
      </>
    );
  }
}

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
)(_Overview);
