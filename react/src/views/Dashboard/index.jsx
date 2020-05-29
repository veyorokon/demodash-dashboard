import React from "react";
import {LeftColumn, ConnectedRightColumn} from "./layout";
import {Flex, Section, DropDown, Text, Image} from "components";
import {NavItem} from "./Components";
import {
  DemoerHome,
  BrandHome,
  FindDemos,
  Settings,
  MyDemos,
  DemodashStore,
  PayoutBilling
} from "./Panels";
import {LogoutBox} from "@styled-icons/remix-line/LogoutBox";
import {DemoerNav, BrandNav} from "./nav";

import logo from "assets/svg/logo.svg";

import {responsive as r} from "lib";

import styled from "styled-components";
const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

const LogoTitle = props => (
  <Flex flexGrow={0} mb={4} alignItems="center">
    <Image src={logo} h={"3rem"} />
    <Logo
      ml={4}
      mr={"auto"}
      as="h1"
      fs={r("3rem ------> 3.1rem")}
      color="navys.0"
    >
      demodash
    </Logo>
  </Flex>
);

export default props => {
  const accountType = "brand";
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn bg={"whites.0"} display={r("none -------> flex")}>
          <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
            <LogoTitle />
            <Text mb={1}>Account:</Text>
            <DropDown
              mb={4}
              br={2}
              color={"navys.1"}
              useDefaultButton
              onChange={e => console.log(e.target.value)}
              options={[
                {text: "Bromane", value: "test2"},
                {text: "Cherry's Barbershop", value: "TestVal"}
              ]}
              defaultOption={"Create an account"}
              defaultClick={() => console.log("test")}
              iconProps={{h: "2.4rem"}}
            />
            <Flex w={"100%"} flexDirection="column">
              {accountType === "brand" ? <BrandNav /> : <DemoerNav />}
            </Flex>
            <Flex mt={4} flexGrow={0} w={"100%"} flexDirection="column">
              <NavItem text="Logout" icon={<LogoutBox />} />
            </Flex>
          </Flex>
        </LeftColumn>
        <ConnectedRightColumn bg={"navys.4"}>
          <DemoerHome key={"demoerHome"} />
          <BrandHome key={"brandHome"} />
          <FindDemos key={"findDemos"} />
          <MyDemos key={"myDemos"} />
          <DemodashStore key={"demodashStore"} />
          <PayoutBilling key={"payoutBilling"} />
          <Settings key={"settings"} />
        </ConnectedRightColumn>
      </Flex>
    </Section>
  );
};
