import React from "react";
import {Box, Flex, Text, DropDown} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r, getToken} from "lib";
import {Card} from "views/Dashboard/Components";
import SwipeableViews from "react-swipeable-views";
import styled, {css} from "styled-components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {API_MEDIA} from "api";
import {MY_DEMO_BOXES} from "views/Dashboard/gql";

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

function checkIfStartsVowel(word) {
  const vowels = "aeio";
  if (vowels.includes(word[0])) return true;
  return false;
}

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

  checkVariationImage = evt => {
    let index = this.mapVariationToImageIndex(evt.target.value);
    if (index) return this.setState({index: parseInt(index)});
  };

  getVariationOptions = variation => {
    let options = [];
    for (var indx in variation.options) {
      let option = variation.options[indx];
      options.push({text: option.option, value: option.id});
    }
    return options;
  };

  mapVariationToImageIndex = variationId => {
    let images = this.props.images;
    for (var indx in images) {
      let image = images[indx];
      let variationOption = image.variationOption;
      if (variationOption !== null && variationOption.id === variationId) {
        return indx;
      }
    }
    return null;
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
        h="fit-content"
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

        {props.variations &&
          props.variations.map((variation, indx) => {
            let avAn = checkIfStartsVowel(variation.name);
            return (
              <Flex
                flexGrow={0}
                flexDirection="column"
                key={`variation-${indx}`}
              >
                <Text
                  letterSpacing="0.5px"
                  color={"navys.0"}
                  mb={2}
                  fw={500}
                  w={"100%"}
                >
                  {variation.name}:
                </Text>
                <DropDown
                  mb={2}
                  options={this.getVariationOptions(variation)}
                  onChange={evt => this.checkVariationImage(evt)}
                  br={2}
                  maxWidth="100%"
                  w="100%"
                  border={"1px solid lightslategrey"}
                  defaultOption={`Choose ${
                    avAn ? "an" : "a"
                  } ${variation.name.toLowerCase()}`}
                  {...props}
                />
              </Flex>
            );
          })}

        <Flex flexGrow={0} mt={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Sale price:
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

        <Flex flexGrow={0} mt={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Commission:
          </Text>
          <Flex alignItems="center">
            <Text letterSpacing="0.5px" color={"greens.4"} fw={500}>
              ${props.commissionAmount.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  }
}

function _DemoCampaigns(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4} w={r("80rem ---------> 100rem")} maxWidth="100%">
        <Text fw={500} fs={"2rem"}>
          My demo boxes
        </Text>
      </Flex>
      {currentAccountUser && (
        <Query
          query={MY_DEMO_BOXES}
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
            const {demoBoxInventory} = data;
            return (
              <>
                {demoBoxInventory && demoBoxInventory.length ? (
                  demoBoxInventory.map(({demoCampaign}, index) => {
                    const {demoCommissions} = demoCampaign;
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
                        <FormSection>
                          <Flex
                            alignItems="center"
                            flexWrap="wrap"
                            justifyContent={[
                              "space-around",
                              "space-around",
                              "space-around",
                              "space-around",
                              "space-around",
                              "space-between"
                            ]}
                          >
                            <Text
                              h="fit-content"
                              ml={2}
                              mr={2}
                              fs="1.8rem"
                              fw={500}
                            >
                              {demoCampaign.demoBox.name}
                            </Text>
                            <Flex
                              mt={r("1 ---> 0")}
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
                                  Refill:
                                </Text>
                                <Flex alignItems="center">
                                  <Text
                                    letterSpacing="0.5px"
                                    color={"reds.1"}
                                    fw={500}
                                  >
                                    $
                                    {demoCampaign.demoBox.refillPrice.toFixed(
                                      2
                                    )}
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
                                    {demoCampaign.demoBox.shippingPrice
                                      ? `$${demoCampaign.demoBox.shippingPrice.toFixed(
                                          2
                                        )}`
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
                          </Flex>
                        </FormSection>
                        <FormSection bg={"blues.3"} flexDirection="column">
                          <Flex
                            flexWrap={"wrap"}
                            pt={"unset !important"}
                            pb={"unset !important"}
                            p={r("0 --> 3")}
                            justifyContent={"center"}
                          >
                            {demoCommissions && demoCommissions.length ? (
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
                                    variations={product.variations}
                                    price={product.price}
                                    shippingPrice={product.shippingPrice}
                                    commissionAmount={demoCommission.amount}
                                    currentAccountUser={currentAccountUser}
                                  />
                                );
                              })
                            ) : (
                              <Text color={"navys.0"}>
                                No demo boxes found.
                              </Text>
                            )}
                          </Flex>
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
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

export default connect(
  mapStateToProps,
  null
)(_DemoCampaigns);
