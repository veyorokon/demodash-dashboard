import React from "react";
import {Box, Flex, Text, Icon as IconFlex} from "components";
import {Pricetags} from "@styled-icons/evaicons-solid/Pricetags";
import {CoinDollar} from "@styled-icons/icomoon/CoinDollar";
import {HandHoldingUsd} from "@styled-icons/fa-solid/HandHoldingUsd";
import {responsive as r} from "lib";
import styled from "styled-components";

const CardBox = styled(Box)`
  width: 20rem;
`;

const IconCircle = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Icon = props => {
  return (
    <IconCircle
      bg={"navys.3"}
      w={r("4rem")}
      h={r("4rem")}
      mb={3}
      color={"blues.0"}
      {...props}
    >
      <IconFlex w="fit-content" h={r("2rem -------> 2.2rem")}>
        {props.icon}
      </IconFlex>
    </IconCircle>
  );
};

const Card = props => {
  return (
    <CardBox
      p={3}
      pb={4}
      pt={4}
      boxShadow="0 1px 6px rgba(57,73,76,0.35)"
      bg={"whites.0"}
      br={"3px"}
      {...props}
    >
      <Icon icon={props.icon} />
      <Text ml="auto" mr="auto" w={"100%"} fs={"3.2rem"} fw={800}>
        {props.value}
      </Text>
      <Text mb={3} fw={300} ml="auto" mr="auto" w={"100%"}>
        {props.label}
      </Text>
    </CardBox>
  );
};

export default function Home(props) {
  return (
    <Box
      ml={r("2 ---> 3 --> 4 5 6 -> 7")}
      mr={r("2 ---> 3 --> 4 5 6 -> 7")}
      pt={r("5")}
      pb={r("5")}
    >
      <Flex>
        <Flex mb={4}>
          <Text>Analytics Overview</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center">
        <Card mr={2} icon={<Pricetags />} value={0} label={"Total sales"} />
        <Card
          mr={2}
          icon={<CoinDollar />}
          value={"$ 0"}
          label={"Sales volume"}
        />
        <Card
          icon={<HandHoldingUsd />}
          value={"$ 0"}
          label={"Commission earned"}
        />
      </Flex>
    </Box>
  );
}
