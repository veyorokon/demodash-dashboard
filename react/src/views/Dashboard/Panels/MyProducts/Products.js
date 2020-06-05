import React from "react";
import {Box, Flex, Image, Text, DropDown, CallToActionButton} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r, getToken} from "lib";
import {Card} from "views/Dashboard/Components";
import SwipeableViews from "react-swipeable-views";
import styled, {css} from "styled-components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {API_MEDIA} from "api";
import {ACCOUNT_USER__PRODUCTS} from "./gql";

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

  checkVariationImage = evt => {
    let index = this.mapVariationToImageIndex(evt.target.value);
    if (index) return this.setState({index: parseInt(index)});
  };

  render() {
    const {props} = this;
    const {index} = this.state;
    return (
      <Card
        p={3}
        maxWidth={r(
          "26rem 28rem 30rem 33rem  30rem 22rem 29rem 32rem 24rem 30rem 27rem"
        )}
        mr={1}
        ml={1}
        mt={3}
        mb={3}
        bg={"whites.0"}
        br={"3px"}
        {...props}
      >
        <SwipeableViews
          index={index}
          onChangeIndex={indx => this.handleChangeIndex(indx)}
        >
          {props.images.map((image, indx) => (
            <Image
              key={indx}
              mt="auto"
              mb={1}
              w={"100%"}
              src={API_MEDIA + image.image}
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
        <Text
          letterSpacing="0.5px"
          color={"navys.0"}
          mb={2}
          fw={300}
          w={"100%"}
        >
          {props.description}
        </Text>
        {props.variations &&
          props.variations.map((variation, indx) => {
            return (
              <Flex flexDirection="column" key={`variation-${indx}`}>
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
                  hiddenOption={`Choose a ${variation.name.toLowerCase()}`}
                  {...props}
                />
              </Flex>
            );
          })}
        <CallToActionButton
          hoverBackground="#FFC651"
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

function _Products(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          My products
        </Text>
      </Flex>

      <Query
        query={ACCOUNT_USER__PRODUCTS}
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
          const {products} = data.accountUser.account;
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
                  Product previews
                </Text>
              </FormSection>
              <FormSection bg={"blues.3"} flexDirection="column" pt={4} pb={4}>
                <Flex
                  flexWrap={"wrap"}
                  p={r("0 --> 3 -----> 4")}
                  justifyContent={"center"}
                >
                  {products &&
                    products.map((product, index) => (
                      <ImageCard
                        key={index}
                        brand={data.accountUser.account.profile.name || null}
                        title={product.name}
                        description={product.description}
                        images={product.images}
                        variations={product.variations}
                      />
                    ))}
                </Flex>
              </FormSection>
            </Box>
          );
        }}
      </Query>
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
)(_Products);
