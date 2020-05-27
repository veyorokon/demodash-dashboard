import React from "react";
import {Flex, Image, Text} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";
import bromane from "assets/images/bromane-brand.jpg";

const Card = styled(Flex)`
  border-bottom: 1px solid #dae0e6;
  flex-direction: column;
  transition: all 0.1s;
`;

const ImageCard = props => {
  return (
    <Card
      p={3}
      maxWidth={r("26rem --> 33rem  22rem 23rem -> 30rem 24rem 30rem 36rem")}
      mr={2}
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
      <Text letterSpacing="0.5px" color={"navys.1"} mb={2} fw={300} w={"100%"}>
        {props.description}
      </Text>
      <Text letterSpacing="0.5px" color={"navys.1"} fw={400} w={"100%"}>
        {props.price}
      </Text>
    </Card>
  );
};

export default function Results(props) {
  return (
    <Flex
      boxShadow={0}
      br={2}
      bg="whites.0"
      w={r("80rem ---------> 100rem")}
      maxWidth="100%"
      flexWrap={r("wrap")}
      mb={4}
      pl={3}
      pr={3}
      pb={4}
      pt={4}
      justifyContent={["center"]}
    >
      <ImageCard
        title="Bromane - Hair filling fibers - starter kit"
        description="Hair filling fibers, an applicator pump and cleaning cloth"
        price={0}
      />
      <ImageCard
        title="Bromane - Hair filling fibers - starter kit"
        description="Hair filling fibers, an applicator pump and cleaning cloth"
        price={0}
      />
      <ImageCard
        title="Bromane - Hair filling fibers - starter kit"
        description="Hair filling fibers, an applicator pump and cleaning cloth"
        price={0}
      />
      <ImageCard
        title="Bromane - Hair filling fibers - starter kit"
        description="Hair filling fibers, an applicator pump and cleaning cloth"
        price={0}
      />
    </Flex>
  );
}
