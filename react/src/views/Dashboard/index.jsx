import React from "react";
import {LeftColumn, ConnectedRightColumn} from "./layout";
import {Flex, Section, DropDown, Text, Image} from "components";
import {NavItem, ConnectedNavItem, NavCategory} from "./Components";
import {Home, FindDemos, Settings, MyDemos, DemodashStore} from "./Panels";
import {Home as HomeIcon} from "@styled-icons/boxicons-solid/Home";
import {Search} from "@styled-icons/boxicons-regular/Search";
import {LogoutBox} from "@styled-icons/remix-line/LogoutBox";
import {Settings as SettingsIcon} from "@styled-icons/material/Settings";
import {Users as UsersIcon} from "@styled-icons/heroicons-solid/Users";
import {DollarSign} from "@styled-icons/fa-solid/DollarSign";

import DemodashIcon from "assets/icons/demodash";
import ProductDemoIcon from "assets/icons/productDemos";
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

const DemoerNav = props => {
  return (
    <>
      <ConnectedNavItem id={"home"} text="Home" icon={<HomeIcon />} />
      <NavCategory mt={3} text={"Demos"} />
      <ConnectedNavItem
        id={"findDemos"}
        text="Find demos"
        icon={<Search />}
        ml={3}
      />
      <ConnectedNavItem
        id={"myDemos"}
        text="My demos"
        icon={<ProductDemoIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"demodashStore"}
        text="demodash store"
        icon={<DemodashIcon />}
        ml={3}
      />
      <NavCategory mt={3} text={"Account"} />
      <ConnectedNavItem
        id={"payoutBilling"}
        text="Payout & billing"
        icon={<DollarSign />}
        ml={3}
      />
      <ConnectedNavItem id={"users"} text="Users" icon={<UsersIcon />} ml={3} />
      <ConnectedNavItem
        id={"settings"}
        text="Settings"
        icon={<SettingsIcon />}
        ml={3}
      />
    </>
  );
};

export default () => {
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
              options={[{text: "Cherry's Barbershop", value: "TestVal"}]}
              defaultOption={"Create an account"}
              defaultClick={() => console.log("test")}
              iconProps={{h: "2.4rem"}}
            />
            <Flex w={"100%"} flexDirection="column">
              <DemoerNav />
            </Flex>
            <Flex mt={4} flexGrow={0} w={"100%"} flexDirection="column">
              <NavItem text="Logout" icon={<LogoutBox />} />
            </Flex>
          </Flex>
        </LeftColumn>
        <ConnectedRightColumn bg={"navys.4"}>
          <Home key={"home"} />
          <FindDemos key={"findDemos"} />
          <MyDemos key={"myDemos"} />
          <DemodashStore key={"demodashStore"} />
          <Settings key={"settings"} />
        </ConnectedRightColumn>
      </Flex>
    </Section>
  );
};
