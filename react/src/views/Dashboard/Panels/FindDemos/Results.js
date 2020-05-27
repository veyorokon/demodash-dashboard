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
      maxWidth={r("26rem --> 33rem  22rem 23rem -> 30rem 24rem 30rem")}
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
      <Text
        mt="auto"
        letterSpacing="0.5px"
        color={"navys.0"}
        mb={2}
        fw={300}
        w={"100%"}
      >
        {props.description}
      </Text>
      <Flex flexGrow={0} h="fit-content" mt="auto" w={"100%"}>
        <Text
          mr={2}
          letterSpacing="0.5px"
          color={"navys.2"}
          fw={500}
          w={"100%"}
        >
          Box price:
        </Text>
        {props.boxPrice ? (
          <Text letterSpacing="0.5px" color={"navys.1"} fw={600} w={"100%"}>
            ${props.boxPrice.toFixed(2)}
          </Text>
        ) : (
          <Text letterSpacing="0.5px" color={"greens.4"} fw={600} w={"100%"}>
            Free
          </Text>
        )}
      </Flex>

      <Flex flexGrow={0} h="fit-content" w={"100%"}>
        <Text
          mr={2}
          letterSpacing="0.5px"
          color={"navys.2"}
          fw={500}
          w={"100%"}
        >
          Box refill:
        </Text>
        {props.refillPrice ? (
          <Text letterSpacing="0.5px" color={"navys.1"} fw={600} w={"100%"}>
            ${props.refillPrice.toFixed(2)}
          </Text>
        ) : (
          <Text letterSpacing="0.5px" color={"greens.4"} fw={600} w={"100%"}>
            Free
          </Text>
        )}
      </Flex>
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
      p={r("0 --> 3 -----> 4")}
      justifyContent={"center"}
    >
      <ImageCard
        title="Bromane - Hair filling fibers"
        description="Hair filling fibers that add density to thinning hair"
        boxPrice={1}
        refillPrice={1}
      />
      <ImageCard
        title="Bromane - Hair filling fibers - starter kit"
        description="Hair filling fibers, an applicator pump and cleaning cloth"
        boxPrice={0}
        refillPrice={0}
      />
    </Flex>
  );
}
