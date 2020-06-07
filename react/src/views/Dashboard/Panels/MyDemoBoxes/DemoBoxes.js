import React from "react";
import {Box, Flex, Text, CallToActionButton, Icon} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r, getToken} from "lib";
import {Card} from "views/Dashboard/Components";
import SwipeableViews from "react-swipeable-views";
import styled, {css} from "styled-components";
import {Mutation, Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {API_MEDIA} from "api";
import {DEMO_BOXES, DELETE_DEMO_BOX} from "views/Dashboard/gql";

import {Delete} from "@styled-icons/material/Delete";

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

  deleteDemoBoxMutation = deleteDemoBox => {
    const {demoBoxId, currentAccountUser} = this.props;
    return deleteDemoBox({
      variables: {
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser),
        demoBoxId: parseInt(demoBoxId)
      }
    });
  };

  render() {
    const {props} = this;
    const {index} = this.state;
    const {currentAccountUser} = props;
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
        <Flex flexGrow={0} alignItems="center" justifyContent="flex-end">
          <Mutation
            mutation={DELETE_DEMO_BOX}
            refetchQueries={[
              {
                query: DEMO_BOXES,
                variables: {
                  token: getToken().token,
                  accountUserId: parseInt(currentAccountUser)
                }
              }
            ]}
          >
            {deleteDemoBox => (
              <Icon
                onClick={() => {
                  let conf = window.confirm(
                    "Are you sure you want to delete this demo box?"
                  );
                  if (conf) return this.deleteDemoBoxMutation(deleteDemoBox);
                }}
                cursor="pointer"
                color="oranges.0"
                h="2rem"
              >
                <Delete />
              </Icon>
            )}
          </Mutation>
        </Flex>
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
          <Text
            letterSpacing="0.5px"
            color={"navys.0"}
            mb={1}
            fw={500}
            w={"100%"}
          >
            Includes:
          </Text>
          {props.items &&
            props.items.map((item, indx) => (
              <Text
                key={indx}
                letterSpacing="0.5px"
                color={"navys.0"}
                mb={1}
                fw={400}
                w={"100%"}
              >
                - {item.product.name}
              </Text>
            ))}
        </Flex>

        <Flex mt={1} mb={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Price:
          </Text>
          <Text letterSpacing="0.5px" color={"reds.1"} fw={500}>
            ${props.price.toFixed(2)}
          </Text>
        </Flex>
        <Flex mt={1} mb={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Refill price:
          </Text>
          <Text letterSpacing="0.5px" color={"reds.1"} fw={500}>
            ${props.refillPrice.toFixed(2)}
          </Text>
        </Flex>
        <Flex mt={1} mb={1} alignItems="center">
          <Text letterSpacing="0.5px" color={"navys.0"} mr={2} fw={500}>
            Shipping price:
          </Text>
          <Text letterSpacing="0.5px" color={"reds.1"} fw={500}>
            ${props.shippingPrice.toFixed(2)}
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

function _DemoBoxes(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          My demo boxes
        </Text>
      </Flex>

      {currentAccountUser && (
        <Query
          query={DEMO_BOXES}
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
            const {demoBoxes} = data;
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
                    Demo boxes
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
                    {demoBoxes && demoBoxes.length ? (
                      demoBoxes.map((box, index) => (
                        <ImageCard
                          key={index}
                          brand={
                            (box.account.profile && box.account.profile.name) ||
                            null
                          }
                          demoBoxId={box.id}
                          title={box.name}
                          description={box.description}
                          images={box.images}
                          price={box.price}
                          items={box.items}
                          shippingPrice={box.shippingPrice}
                          refillPrice={box.refillPrice}
                          currentAccountUser={currentAccountUser}
                        />
                      ))
                    ) : (
                      <Text color={"black"}>
                        You don't have any demo boxes.
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
)(_DemoBoxes);
