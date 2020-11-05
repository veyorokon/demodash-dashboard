import React from "react";
import {Flex, Text} from "components";
import TotalSales from "./TotalSales";
import SalesVolume from "./SalesVolume";
import TotalCommission from "./TotalCommission";
import {responsive as r} from "lib";

export default function Analytics(props) {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Analytics
        </Text>
      </Flex>
      <Flex
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
        <TotalSales />
        <SalesVolume />
        <TotalCommission />
      </Flex>
    </>
  );
}
