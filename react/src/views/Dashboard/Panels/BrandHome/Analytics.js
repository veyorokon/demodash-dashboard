import React from "react";
import {Flex, Text} from "components";
import {IconCard} from "views/Dashboard/Components";
import {Pricetags} from "@styled-icons/evaicons-solid/Pricetags";
import {CoinDollar} from "@styled-icons/icomoon/CoinDollar";
import {HandHoldingUsd} from "@styled-icons/fa-solid/HandHoldingUsd";
import {responsive as r} from "lib";

import styled from "styled-components";
const FlexGroup = styled(Flex)``;

export default function Analytics(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Analytics
        </Text>
      </Flex>
      <FlexGroup
        flexWrap={r("wrap  ----> unset")}
        mb={4}
        justifyContent={[
          "center",
          "center",
          "center",
          "center",
          "center",
          "space-between"
        ]}
        alignItems="center"
      >
        <IconCard
          iconProps={{color: "blues.0", bg: "navys.3"}}
          mr={r("2")}
          mb={r("2")}
          icon={<Pricetags />}
          value={0}
          title={"Total sales"}
        />
        <IconCard
          mr={r("2")}
          mb={r("2")}
          icon={<CoinDollar />}
          iconProps={{color: "greens.2", bg: "greens.3"}}
          value={"$ 0"}
          title={"Sales volume"}
        />
        <IconCard
          mr={r("2")}
          mb={r("2")}
          icon={<HandHoldingUsd />}
          iconProps={{color: "yellows.0", bg: "yellows.2"}}
          value={"$ 0"}
          title={"Commission paid"}
        />
      </FlexGroup>
    </>
  );
}
