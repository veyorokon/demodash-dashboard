import React from "react";
import {Box, Flex, Text, CallToActionButton} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r, getToken} from "lib";
import {Card} from "views/Dashboard/Components";
import SwipeableViews from "react-swipeable-views";
import styled, {css} from "styled-components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {API_MEDIA} from "api";
import {OPEN_DEMO_CAMPAIGNS, QUERY_ACCOUNT_BILLABLE} from "views/Dashboard/gql";
import {
  toggleCheckout,
  updateDemoCheckoutForm,
  updateScrollY,
  updatePanel
} from "redux/actions";

const NavigationBullet = styled(Flex)`
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;
  background: grey;
  border-radius: 50%;
  flex-grow: 0;
  border: 5px solid transparent;

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
  flex-grow: 0;
  height: fit-content;
  color: black;
  & > ${NavigationBullet} {
    margin-right: 1rem;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

const BackgroundImage = styled(Box)`
  background: url(${props => props.image});
  height: 0;
  position: relative;
  padding-bottom: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Price = styled(Text)`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const LineItem = props => (
  <Flex mb={1} mt={2} w={"25rem"} maxWidth="100%" flexWrap="wrap" {...props}>
    <Text justifySelf="flex-start" {...props.titleProps}>
      {props.title}
    </Text>
    <Price
      ml={2}
      justifySelf="flex-end"
      color="oranges.0"
      {...props.valueProps}
    >
      {props.value}
    </Price>
  </Flex>
);

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index || 0
    };
  }

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const {props} = this;
    const {index} = this.state;
    return (
      <Card
        p={3}
        maxWidth={r(
          "26rem 28rem 30rem 33rem  30rem 28rem 29rem 32rem 25rem 29rem 27rem"
        )}
        mr={1}
        ml={1}
        mt={3}
        mb={3}
        bg={"whites.0"}
        br={2}
        {...props}
      >
        <SwipeableViews
          index={index}
          onChangeIndex={indx => this.handleChangeIndex(indx)}
        >
          {props.images.map((image, indx) => (
            <BackgroundImage
              key={indx}
              mt="auto"
              mb={1}
              br={1}
              w={"100%"}
              image={API_MEDIA + image.image}
            />
          ))}
        </SwipeableViews>
        {props.images.length > 1 && (
          <PanelNavigation mt={2} mb={2}>
            {props.images.map((image, indx) => (
              <NavigationBullet
                alignItems="center"
                justifyContent="center"
                w={r("1rem")}
                h={r("1rem")}
                onClick={() => this.handleChangeIndex(indx)}
                color={"blacks.0"}
                key={indx}
                active={index === indx}
              />
            ))}
          </PanelNavigation>
        )}

        <Flex flexDirection="column" justifyContent="flex-start">
          {props.brand && (
            <Text
              letterSpacing="0.5px"
              color={"greys.0"}
              mt={props.images.length === 1 ? 3 : 0}
              mb={2}
              fw={400}
              w={"100%"}
            >
              {props.brand}
            </Text>
          )}
          <Text
            mt="2"
            letterSpacing="0.5px"
            color={"navys.0"}
            mb={2}
            fw={600}
            w={"100%"}
          >
            {props.title}
          </Text>
          <Text
            letterSpacing="0.5px"
            color={"navys.0"}
            mb={2}
            fw={300}
            w={"100%"}
          >
            {props.description}
          </Text>
        </Flex>

        <Flex mt={1} mb={2} flexDirection="column" flexGrow={0}>
          <Flex flexGrow={0} h={"fit-content"} maxWidth="100%" pl={2} pr={2}>
            <Flex
              flexDirection="column"
              flexGrow={0}
              h={"fit-content"}
              maxWidth="100%"
              borderBottom={"1px solid #e3e3ee"}
            >
              <LineItem
                mt={0}
                valueProps={{fw: 500, color: "navys.1"}}
                title={"Price:"}
                value={`$${props.price.toFixed(2)}`}
              />
              <LineItem
                mt={0}
                valueProps={{fw: 500, color: "navys.1"}}
                title={"Shipping:"}
                value={`${
                  props.shippingPrice
                    ? `$${props.shippingPrice.toFixed(2)}`
                    : "FREE"
                }`}
              />
              <LineItem
                mt={0}
                valueProps={{fw: 500, color: "greens.4"}}
                title={"Commission:"}
                value={`$${props.commissionAmount.toFixed(2)}`}
              />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    );
  }
}

const TitleSection = props => {
  const {demoBox} = props;
  return (
    <FormSection>
      <Flex alignItems="center" flexWrap="wrap">
        <Text h="fit-content" ml={2} mr={2} fs="1.8rem" fw={500}>
          {demoBox.name}
        </Text>
      </Flex>
    </FormSection>
  );
};

function Results(props) {
  const {
    currentAccountUser,
    toggleCheckout,
    updateDemoCheckoutForm,
    demoCheckoutForm,
    updateScrollY,
    updatePanel
  } = props;
  return (
    <>
      {currentAccountUser && (
        <Query
          query={OPEN_DEMO_CAMPAIGNS}
          variables={{
            token: getToken().token,
            accountUserId: parseInt(currentAccountUser)
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
            const {openDemoCampaigns} = data;
            return (
              <>
                {openDemoCampaigns && openDemoCampaigns.length ? (
                  openDemoCampaigns.map((demoCampaign, index) => {
                    const {demoBox, demoCommissions} = demoCampaign;

                    return (
                      <Box
                        key={index}
                        w={r("80rem ---------> 100rem")}
                        maxWidth="100%"
                        boxShadow="0 1px 6px rgba(57,73,76,0.35)"
                        bg={"whites.0"}
                        br={2}
                        mb={4}
                      >
                        <TitleSection demoBox={demoBox} />
                        <FormSection bg={"blues.3"} flexDirection="column">
                          <Flex
                            flexWrap={"wrap"}
                            pt={"unset !important"}
                            pb={"unset !important"}
                            p={r("0 --> 3")}
                            justifyContent={"center"}
                          >
                            {demoCommissions &&
                              demoCommissions.length &&
                              demoCommissions.map((demoCommission, indx) => {
                                const {product} = demoCommission.demoBoxItem;
                                return (
                                  <ProductCard
                                    key={indx}
                                    brand={
                                      (demoCampaign.account.profile &&
                                        demoCampaign.account.profile.name) ||
                                      null
                                    }
                                    productId={product.id}
                                    title={product.name}
                                    description={product.description}
                                    images={product.images}
                                    price={product.price}
                                    shippingPrice={product.shippingPrice}
                                    commissionAmount={demoCommission.amount}
                                  />
                                );
                              })}
                          </Flex>
                        </FormSection>

                        <FormSection
                          justifyContent={[
                            "space-around",
                            "space-around",
                            "space-around",
                            "space-around",
                            "space-around",
                            "space-between"
                          ]}
                          flexDirection={r("column ----> row")}
                          alignItems="center"
                        >
                          <Flex
                            mb={r("2 ----> 0")}
                            flexGrow={0}
                            flexDirection="column"
                          >
                            <Flex
                              flexGrow={0}
                              ml={2}
                              mr={2}
                              alignItems="center"
                            >
                              <Text
                                letterSpacing="0.5px"
                                color={"navys.0"}
                                mr={2}
                                fw={500}
                              >
                                Price:
                              </Text>
                              <Flex alignItems="center">
                                <Text
                                  letterSpacing="0.5px"
                                  color={"reds.1"}
                                  fw={500}
                                >
                                  ${demoBox.price.toFixed(2)}
                                </Text>
                                <Text
                                  ml={1}
                                  letterSpacing="0.5px"
                                  color={"navys.0"}
                                  fw={500}
                                  fs={"1.2rem"}
                                >
                                  &#43;
                                </Text>
                                <Text
                                  letterSpacing="0.5px"
                                  color={"navys.1"}
                                  fw={500}
                                  ml={1}
                                  fs={"1.2rem"}
                                  h="fit-content"
                                >
                                  {demoBox.shippingPrice
                                    ? `$${demoBox.shippingPrice.toFixed(2)}`
                                    : "FREE"}
                                </Text>
                                <Text
                                  ml={1}
                                  letterSpacing="0.5px"
                                  color={"navys.1"}
                                  fw={500}
                                  fs={"1.2rem"}
                                  h="fit-content"
                                >
                                  Shipping
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex
                              flexGrow={0}
                              ml={2}
                              mr={2}
                              alignItems="center"
                            >
                              <Text
                                letterSpacing="0.5px"
                                color={"navys.0"}
                                mr={2}
                                fw={500}
                              >
                                Refill:
                              </Text>
                              <Flex alignItems="center">
                                <Text
                                  letterSpacing="0.5px"
                                  color={"reds.1"}
                                  fw={500}
                                >
                                  ${demoBox.refillPrice.toFixed(2)}
                                </Text>
                                <Text
                                  ml={1}
                                  letterSpacing="0.5px"
                                  color={"navys.0"}
                                  fw={500}
                                  fs={"1.2rem"}
                                >
                                  &#43;
                                </Text>
                                <Text
                                  letterSpacing="0.5px"
                                  color={"navys.1"}
                                  fw={500}
                                  ml={1}
                                  fs={"1.2rem"}
                                  h="fit-content"
                                >
                                  {demoBox.shippingPrice
                                    ? `$${demoBox.shippingPrice.toFixed(2)}`
                                    : "FREE"}
                                </Text>
                                <Text
                                  ml={1}
                                  letterSpacing="0.5px"
                                  color={"navys.1"}
                                  fw={500}
                                  fs={"1.2rem"}
                                  h="fit-content"
                                >
                                  Shipping
                                </Text>
                              </Flex>
                            </Flex>
                          </Flex>

                          <Query
                            query={QUERY_ACCOUNT_BILLABLE}
                            variables={{
                              token: getToken().token,
                              id: parseInt(currentAccountUser)
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
                              const {hasValidCard} = data.accountUser.account;
                              return (
                                <CallToActionButton
                                  cursor={"pointer"}
                                  hoverBackground={"#F87060"}
                                  bg={"oranges.1"}
                                  color={"whites.0"}
                                  hoverColor={"whites.0"}
                                  br={2}
                                  w={r("100% 25rem ---> 18rem")}
                                  maxWidth="100%"
                                  fs={"1.6rem"}
                                  onClick={() => {
                                    if (hasValidCard) {
                                      const container = document.querySelector(
                                        "#rightContainer"
                                      );
                                      let mobileTop = Math.abs(
                                        container.getBoundingClientRect().top
                                      );
                                      let desktopTop = container.scrollTop;

                                      updateScrollY(
                                        Math.max(mobileTop, desktopTop)
                                      );
                                      window.scrollTo(0, 0);
                                      updateDemoCheckoutForm({
                                        ...demoCheckoutForm,
                                        demoCampaignId: demoCampaign.id
                                      });
                                      return toggleCheckout();
                                    } else {
                                      window.scrollTo(0, 0);
                                      return updatePanel("payoutBilling");
                                    }
                                  }}
                                >
                                  {hasValidCard
                                    ? "Order a demo box"
                                    : "Update billing info"}
                                </CallToActionButton>
                              );
                            }}
                          </Query>
                        </FormSection>
                      </Box>
                    );
                  })
                ) : (
                  <Text color={"navys.0"}>No demo boxes found.</Text>
                )}
              </>
            );
          }}
        </Query>
      )}
    </>
  );
}
const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser,
    demoCheckoutForm: state.demoCheckoutForm
  };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckout: () => dispatch(toggleCheckout()),
    updateScrollY: payload => dispatch(updateScrollY(payload)),
    updateDemoCheckoutForm: payload =>
      dispatch(updateDemoCheckoutForm(payload)),
    updatePanel: payload => dispatch(updatePanel(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
