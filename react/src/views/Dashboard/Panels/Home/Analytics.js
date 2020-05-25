import React from "react";
import {Box, Flex, Text, Input, Icon as IconFlex} from "components";
import {Pricetags} from "@styled-icons/evaicons-solid/Pricetags";
import {CoinDollar} from "@styled-icons/icomoon/CoinDollar";
import {HandHoldingUsd} from "@styled-icons/fa-solid/HandHoldingUsd";
import {responsive as r} from "lib";
import styled from "styled-components";

const CardBox = styled(Box)``;

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
      w={r("4rem --------> 4.5rem")}
      h={r("4rem --------> 4.5rem")}
      mb={3}
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
      w={r("20rem --------> 23rem")}
      boxShadow="0 1px 6px rgba(57,73,76,0.35)"
      bg={"whites.0"}
      br={"3px"}
      {...props}
    >
      <Icon icon={props.icon} {...props.iconProps} />
      <Text ml="auto" mr="auto" w={"100%"} fs={"3.6rem"} fw={800}>
        {props.value}
      </Text>
      <Text mb={3} fw={300} ml="auto" mr="auto" w={"100%"}>
        {props.label}
      </Text>
    </CardBox>
  );
};

const FlexCol = props => {
  return (
    <Flex
      w="fit-content"
      maxWidth="100%"
      m="auto"
      flexDirection="column"
      {...props}
    >
      {props.children}
    </Flex>
  );
};

const FormCard = props => {
  return (
    <Box
      w={r("100%")}
      boxShadow="0 1px 6px rgba(57,73,76,0.35)"
      bg={"whites.0"}
      br={"4px"}
      {...props}
    >
      <Flex boxShadow={"inset 0 -1px #e3e3ee"} p={3}>
        <Text fs="1.6rem" fw={500}>
          Account Settings
        </Text>
      </Flex>
      <Flex boxShadow={"inset 0 -1px #e3e3ee"} p={3}>
        <Flex>
          <Flex justifyContent="flex-end">
            <Text fs={"1.4rem"} h="fit-content" mr={2} mt="auto" mb="auto">
              Account name:
            </Text>
          </Flex>
          <Flex>
            <Input fs={"1.4rem"} p={1} pl={2} pr={2} />
          </Flex>
        </Flex>
      </Flex>
      <Flex boxShadow={"inset 0 -1px #e3e3ee"} p={3} justifyContent="flex-end">
        <Text fs="1.6rem" fw={500}>
          Save
        </Text>
      </Flex>
    </Box>
  );
};

export default function Home(props) {
  return (
    <Box
      ml={r("2 ----> 3 ---->  auto")}
      mr={r("2 ----> 3 ---->  auto")}
      pl={r("1 ----> 4")}
      pr={r("1 ----> 4")}
      pt={r("5")}
      pb={r("5")}
    >
      <FlexCol>
        <Flex mb={4}>
          <Text fw={500} fs={"1.8rem"}>
            Analytics Overview
          </Text>
        </Flex>
        <Flex mb={4} justifyContent="center">
          <Card
            iconProps={{color: "blues.0", bg: "navys.3"}}
            mr={2}
            icon={<Pricetags />}
            value={0}
            label={"Total sales"}
          />
          <Card
            mr={2}
            icon={<CoinDollar />}
            iconProps={{color: "greens.2", bg: "greens.3"}}
            value={"$ 0"}
            label={"Sales volume"}
          />
          <Card
            icon={<HandHoldingUsd />}
            iconProps={{color: "yellows.0", bg: "yellows.2"}}
            value={"$ 0"}
            label={"Commission earned"}
          />
        </Flex>
        <Flex mb={4}>
          <Text fw={500} fs={"1.8rem"}>
            Profile
          </Text>
        </Flex>
        <Flex mb={4} justifyContent="center">
          <FormCard />
        </Flex>
      </FlexCol>
    </Box>
  );
}
