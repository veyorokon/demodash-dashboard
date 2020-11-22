import React from "react";
import {LeftColumn, ConnectedRightColumn} from "./layout";
import {Flex, Section, Text, LogoTitle} from "components";
import {
  NavItem,
  AccountUserDropDown,
  QueryAccountUsers
} from "views/Dashboard/Components";
import {
  CreateAccount,
  Home,
  FindDemos,
  Settings,
  MyDemos,
  DemodashStore,
  PayoutBilling,
  MyProducts,
  MyDemoBoxes,
  MyDemoCampaigns,
  FindDemoers,
  Sales
} from "./Panels";
import {LogoutBox} from "@styled-icons/remix-line/LogoutBox";
import {
  // DemoerNav,
  // BrandNav
  AllNav
} from "./nav";

import {responsive as r, clearToken} from "lib";
import {connect} from "react-redux";

const mapStateToProps = state => {
  const {currentAccountUser, accountUserSet} = state.dashboard;
  return {
    currentAccountUser,
    accountUserSet
  };
};

const _Dashboard = props => {
  // const {accountUserSet, currentAccountUser} = props;
  // let type;
  // if (currentAccountUser) {
  //   const accountUser = accountUserSet.filter(
  //     option => option.id === currentAccountUser
  //   )[0];
  //   type = accountUser.account.type;
  // }
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn bg={"whites.0"} display={r("none -------> flex")}>
          <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
            <LogoTitle />
            <Text mb={1}>Account:</Text>
            <QueryAccountUsers />
            <AccountUserDropDown />
            <Flex w={"100%"} flexDirection="column">
              {/*type ? type === "Brand" ? <BrandNav /> : <DemoerNav /> : null*/}
              <AllNav />
            </Flex>
            <Flex mt={4} flexGrow={0} w={"100%"} flexDirection="column">
              <NavItem
                onClick={() => {
                  clearToken();
                  return props.history.push("/login");
                }}
                text="Logout"
                icon={<LogoutBox />}
              />
            </Flex>
          </Flex>
        </LeftColumn>
        <ConnectedRightColumn bg={"navys.4"}>
          <CreateAccount key={"createAccount"} />
          <Home key={"home"} />
          <FindDemos key={"findDemos"} />
          <MyDemos key={"myDemos"} />
          <DemodashStore key={"demodashStore"} />

          <MyProducts key={"myProducts"} />
          <MyDemoBoxes key={"myDemoBoxes"} />
          <MyDemoCampaigns key={"myDemoCampaigns"} />
          <FindDemoers key={"findDemoers"} />
          <Sales key={"sales"} />

          <PayoutBilling key={"payoutBilling"} />
          <Settings key={"settings"} />
        </ConnectedRightColumn>
      </Flex>
    </Section>
  );
};

export default connect(
  mapStateToProps,
  null
)(_Dashboard);
