import React from "react";
import {Flex, Image, Text, CallToActionButton} from "components";
import {responsive as r} from "lib";
import bromane from "assets/images/bromane-brand.jpg";
import bromane2 from "assets/images/bromane.jpg";
import {Card} from "views/Dashboard/Components";
import SwipeableViews from "react-swipeable-views";
import styled, {css} from "styled-components";

const NavigationBullet = styled(Flex)`
  cursor: pointer;
  transition: all 0.3s ease-out;
  outline: none;
  background: grey;
  border-radius: 50%;
  flex-grow: 0;

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

const IMAGES = [
  bromane,
  bromane2,
  bromane2,
  bromane2,
  bromane2,
  bromane2,
  bromane2,
  bromane2
];

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index || 0
    };
  }

  handleChangeIndex = index => {
    console.log(index);
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
          "26rem 28rem 30rem 33rem  22rem 24rem 30rem 34rem 24rem 30rem 27rem"
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
          {IMAGES.map((image, indx) => (
            <Image key={indx} mt="auto" mb={1} w={"100%"} src={image} />
          ))}
        </SwipeableViews>
        <PanelNavigation mt={2} mb={2}>
          {IMAGES.map((image, indx) => (
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
        <Text
          mt="auto"
          letterSpacing="0.5px"
          color={"greys.0"}
          mb={2}
          fw={400}
          w={"100%"}
        >
          Bromane
        </Text>
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

export default function Products(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          My products
        </Text>
      </Flex>
      <Flex
        boxShadow={0}
        br={2}
        bg="whites.0"
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        flexWrap={"wrap"}
        mb={4}
        p={r("0 --> 3 -----> 4")}
        justifyContent={"center"}
      >
        <ImageCard
          title="Hair filling fibers"
          description="Hair filling fibers that add density to thinning hair"
          boxPrice={1}
          refillPrice={1}
          shippingPrice={0}
          storePrice={25}
          commission={1}
        />
        <ImageCard
          title="Hair filling fibers - starter kit"
          description="Hair filling fibers, an applicator pump and cleaning cloth"
          boxPrice={0}
          refillPrice={0}
          shippingPrice={0}
          storePrice={25}
          commission={1}
        />
        <ImageCard
          title="Hair filling fibers - starter kit"
          description="Hair filling fibers, an applicator pump and cleaning cloth"
          boxPrice={0}
          refillPrice={0}
          shippingPrice={0}
          storePrice={25}
          commission={1}
        />
      </Flex>
    </>
  );
}
