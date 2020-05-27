import React from "react";
import {Flex, Image, Text} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";
import bromane from "assets/images/bromane-brand.jpg";
import {Button} from "components";

export const CallToActionButton = styled(Button)`
  height: ${props =>
    props.height ? props.height : props.h ? props.h : "5rem"};
  cursor: pointer;
  min-width: fit-content;
  border: none;
  outline: none;
  letter-spacing: 0.2px;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;

  &:hover {
    color: ${props => props.hoverColor || "black"};
    background: ${props => props.hoverBg || "#f7d590"};
  }
`;

const Card = styled(Flex)`
  border-bottom: 1px solid #dae0e6;
  flex-direction: column;
  transition: all 0.1s;
`;

const Price = props => {
  return (
    <Flex flexGrow={0} h="fit-content" w={"100%"}>
      <Text mr={2} letterSpacing="0.5px" color={"navys.1"} fw={500} w={"100%"}>
        {props.title}
      </Text>
      {props.price ? (
        <Text letterSpacing="0.5px" color={"navys.1"} fw={600} w={"100%"}>
          ${props.price.toFixed(2)}
        </Text>
      ) : (
        <Text letterSpacing="0.5px" color={"greens.4"} fw={600} w={"100%"}>
          Free
        </Text>
      )}
    </Flex>
  );
};

const ImageCard = props => {
  return (
    <Card
      p={3}
      maxWidth={r("26rem --> 33rem  22rem 23rem 31rem 34rem 24rem 30rem 27rem")}
      mr={1}
      ml={1}
      mt={3}
      mb={3}
      bg={"whites.0"}
      br={"3px"}
      {...props}
    >
      <Image mt="auto" mb={2} w={"100%"} src={bromane} />
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
      <Text letterSpacing="0.5px" color={"navys.0"} mb={2} fw={300} w={"100%"}>
        {props.description}
      </Text>
      <Price title={"Box price:"} value={props.boxPrice} />
      <Price title={"Box refill:"} value={props.refillPrice} />
      <Price title={"Shipping:"} value={props.shippingPrice} />
      <CallToActionButton br={2} mt={3} bg={"yellows.1"} w="100%">
        Become a demoer
      </CallToActionButton>
    </Card>
  );
};

export default function Results(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Demo boxes
        </Text>
      </Flex>
      <Flex
        boxShadow={0}
        br={2}
        bg="whites.0"
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        flexWrap={r("wrap")}
        mb={4}
        p={r("0 --> 3 -----> 4")}
        justifyContent={"center"}
      >
        <ImageCard
          title="Bromane - Hair filling fibers"
          description="Hair filling fibers that add density to thinning hair"
          boxPrice={1}
          refillPrice={1}
          shippingPrice={0}
        />
        <ImageCard
          title="Bromane - Hair filling fibers - starter kit"
          description="Hair filling fibers, an applicator pump and cleaning cloth"
          boxPrice={0}
          refillPrice={0}
          shippingPrice={0}
        />
        <ImageCard
          title="Bromane - Hair filling fibers - starter kit"
          description="Hair filling fibers, an applicator pump and cleaning cloth"
          boxPrice={0}
          refillPrice={0}
          shippingPrice={0}
        />
      </Flex>
    </>
  );
}
