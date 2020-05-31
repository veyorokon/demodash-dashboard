import React from "react";
import {LeftColumn, ConnectedRightColumn} from "./layout";
import {Flex, Section, Text, LogoTitle} from "components";
import {NavItem, AccountUserDropDown} from "views/Dashboard/Components";
import {
  DemoerHome,
  BrandHome,
  FindDemos,
  Settings,
  MyDemos,
  DemodashStore,
  PayoutBilling,
  MyProducts,
  MyDemoBoxes,
  MyDemoCampaigns,
  FindDemoers,
  Purchases
} from "./Panels";
import {LogoutBox} from "@styled-icons/remix-line/LogoutBox";
import {
  //DemoerNav,
  //BrandNav,
  AllNav
} from "./nav";

import {responsive as r, clearToken} from "lib";

export default props => {
  // const accountType = "brand";

  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn bg={"whites.0"} display={r("none -------> flex")}>
          <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
            <LogoTitle />
            <Text mb={1}>Account:</Text>
            <AccountUserDropDown />
            <Flex w={"100%"} flexDirection="column">
              {/*{accountType === "brand" ? <BrandNav /> : <DemoerNav />} */}
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
          <DemoerHome key={"demoerHome"} />
          <FindDemos key={"findDemos"} />
          <MyDemos key={"myDemos"} />
          <DemodashStore key={"demodashStore"} />

          <BrandHome key={"brandHome"} />
          <MyProducts key={"myProducts"} />
          <MyDemoBoxes key={"myDemoBoxes"} />
          <MyDemoCampaigns key={"myDemoCampaigns"} />
          <FindDemoers key={"findDemoers"} />
          <Purchases key={"purchases"} />

          <PayoutBilling key={"payoutBilling"} />
          <Settings key={"settings"} />
        </ConnectedRightColumn>
      </Flex>
    </Section>
  );
};
