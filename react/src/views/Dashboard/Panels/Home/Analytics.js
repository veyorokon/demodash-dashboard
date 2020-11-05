import React from "react";
import {Flex, Text} from "components";
import TotalSales from "./TotalSales";
import SalesVolume from "./SalesVolume";
import TotalCommission from "./TotalCommission";
import {responsive as r} from "lib";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser,
    panel: state.panel
  };
};

function _Analytics(props) {
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
        {props.panel === "home" && (
          <>
            <TotalSales />
            <SalesVolume />
            <TotalCommission />
          </>
        )}
      </Flex>
    </>
  );
}

export default connect(
  mapStateToProps,
  null
)(_Analytics);
