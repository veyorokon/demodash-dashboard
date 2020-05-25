import React from "react";
import {Flex, Text} from "components";
import {Card} from "./Components";
import {Pricetags} from "@styled-icons/evaicons-solid/Pricetags";
import {CoinDollar} from "@styled-icons/icomoon/CoinDollar";
import {HandHoldingUsd} from "@styled-icons/fa-solid/HandHoldingUsd";

export default function Analytics(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Analytics Overview
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="space-between">
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
    </>
  );
}
