import React from "react";
import {Flex, Image, Text, CallToActionButton} from "components";
import {responsive as r} from "lib";
import bromane from "assets/images/bromane-brand.jpg";
import {Card} from "views/Dashboard/Components";

const ImageCard = props => {
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
      <CallToActionButton
        hoverBackground="#FFC651"
        br={2}
        mt={2}
        bg={"yellows.1"}
        w="100%"
      >
        Create a demo box
      </CallToActionButton>
    </Card>
  );
};

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
          title="Bromane - Hair filling fibers"
          description="Hair filling fibers that add density to thinning hair"
          boxPrice={1}
          refillPrice={1}
          shippingPrice={0}
          storePrice={25}
          commission={1}
        />
        <ImageCard
          title="Bromane - Hair filling fibers - starter kit"
          description="Hair filling fibers, an applicator pump and cleaning cloth"
          boxPrice={0}
          refillPrice={0}
          shippingPrice={0}
          storePrice={25}
          commission={1}
        />
        <ImageCard
          title="Bromane - Hair filling fibers - starter kit"
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
