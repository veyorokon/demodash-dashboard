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
import {OPEN_DEMO_CAMPAIGNS} from "views/Dashboard/gql";

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

class ImageCard extends React.Component {
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

  deleteDemoCampaignMutation = deleteDemoCampaign => {
    const {demoCampaignId, currentAccountUser} = this.props;
    return deleteDemoCampaign({
      variables: {
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser),
        demoCampaignId: parseInt(demoCampaignId)
      }
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
        <Text mb={2} color={"greys.0"}>
          {props.name}
        </Text>
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

        {props.brand && (
          <Text
            mt="auto"
            letterSpacing="0.5px"
            color={"greys.0"}
            mb={2}
            fw={400}
            w={"100%"}
          >
            {props.brand}
          </Text>
        )}
        <Text
          mt="auto"
          letterSpacing="0.5px"
          color={"navys.0"}
          mb={2}
          fw={600}
          w={"100%"}
        >
          {props.title}
        </Text>

        <Flex mt={1} mb={1} flexDirection="column" flexGrow={0}>
          <Text letterSpacing="0.5px" color={"navys.0"} fw={500} w={"100%"}>
            Products:
          </Text>
          {props.commissions &&
            props.commissions.map((item, indx) => (
              <Flex
                flexGrow={0}
                h={"fit-content"}
                maxWidth="100%"
                key={indx}
                pl={2}
                pr={2}
              >
                <Flex
                  flexDirection="column"
                  flexGrow={0}
                  h={"fit-content"}
                  maxWidth="100%"
                  borderBottom={"1px solid #e3e3ee"}
                  mb={props.commissions.length - 1 === indx ? 0 : 1}
                  mt={props.commissions.length - 1 === indx ? 0 : 1}
                >
                  <Text
                    letterSpacing="0.5px"
                    color={"navys.1"}
                    mb={1}
                    mt={1}
                    fw={400}
                    w={"100%"}
                  >
                    {item.demoBoxItem.product.name}
                  </Text>

                  <LineItem
                    mt={0}
                    valueProps={{fw: 500, color: "navys.1"}}
                    title={"Price:"}
                    value={`$${item.demoBoxItem.product.price.toFixed(2)}`}
                  />
                  <LineItem
                    mt={0}
                    valueProps={{fw: 500, color: "greens.4"}}
                    title={"Commission:"}
                    value={`$${item.amount.toFixed(2)}`}
                  />
                </Flex>
              </Flex>
            ))}
        </Flex>

        <Flex mt={1} mb={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Price:
          </Text>
          <Flex alignItems="center">
            <Text letterSpacing="0.5px" color={"reds.1"} fw={500}>
              ${props.price.toFixed(2)}
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
              {props.shippingPrice
                ? `$${props.shippingPrice.toFixed(2)}`
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
        <Flex mt={1} mb={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Refill price:
          </Text>
          <Text letterSpacing="0.5px" color={"reds.1"} fw={500}>
            ${props.refillPrice.toFixed(2)}
          </Text>
        </Flex>
        <CallToActionButton
          hoverBackground="#FFC651"
          cursor="pointer"
          br={2}
          mt={2}
          bg={"yellows.1"}
          w="100%"
        >
          <Text ml="auto" mr="auto">
            Create a demo box
          </Text>
        </CallToActionButton>
      </Card>
    );
  }
}

function _DemoCampaigns(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          My demo campaigns
        </Text>
      </Flex>

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
            console.log(data);
            return (
              <Box
                w={r("80rem ---------> 100rem")}
                maxWidth="100%"
                boxShadow="0 1px 6px rgba(57,73,76,0.35)"
                bg={"whites.0"}
                br={2}
                mb={4}
              >
                <FormSection>
                  <Text fs="1.8rem" fw={500}>
                    Demo campaigns
                  </Text>
                </FormSection>
                <FormSection
                  bg={"blues.3"}
                  flexDirection="column"
                  pt={4}
                  pb={4}
                >
                  <Flex
                    flexWrap={"wrap"}
                    p={r("0 --> 3 -----> 4")}
                    justifyContent={"center"}
                  >
                    {openDemoCampaigns && openDemoCampaigns.length ? (
                      openDemoCampaigns.map((demoCampaign, index) => {
                        const {demoCommissions, demoBox} = demoCampaign;
                        return (
                          <ImageCard
                            key={index}
                            brand={
                              (demoCampaign.account.profile &&
                                demoCampaign.account.profile.name) ||
                              null
                            }
                            name={demoCampaign.name}
                            demoCampaignId={demoCampaign.id}
                            title={demoBox.name}
                            images={demoBox.images}
                            price={demoBox.price}
                            commissions={demoCommissions}
                            shippingPrice={demoBox.shippingPrice}
                            refillPrice={demoBox.refillPrice}
                            currentAccountUser={currentAccountUser}
                          />
                        );
                      })
                    ) : (
                      <Text color={"navys.0"}>
                        You currently don't have any campaigns.
                      </Text>
                    )}
                  </Flex>
                </FormSection>
              </Box>
            );
          }}
        </Query>
      )}
    </>
  );
}
const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

export default connect(
  mapStateToProps,
  null
)(_DemoCampaigns);
