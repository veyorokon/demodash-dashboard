import React from "react";
import {LeftColumn, ConnectedRightColumn} from "./layout";
import {Flex, Section, DropDown} from "components";
import {NavItem, ConnectedNavItem, NavCategory} from "./Components";
import {Home, FindDemos} from "./Panels";
import {Home as HomeIcon} from "@styled-icons/boxicons-solid/Home";
import {LogOut} from "@styled-icons/boxicons-regular/LogOut";
import {responsive as r} from "lib";

const DemoerNav = props => {
  return (
    <>
      <ConnectedNavItem id={"home"} text="Home" icon={<HomeIcon />} />
      <NavCategory mt={3} text={"Demos"} />
      <ConnectedNavItem
        id={"findDemos"}
        text="Find demos"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"myDemos"}
        text="My demos"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"demodashStore"}
        text="demodash store"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavCategory mt={3} text={"Account"} />
      <ConnectedNavItem
        id={"payoutBilling"}
        text="Payout & billing"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem id={"users"} text="Users" icon={<HomeIcon />} ml={3} />
      <ConnectedNavItem
        id={"settings"}
        text="Settings"
        icon={<HomeIcon />}
        ml={3}
      />
    </>
  );
};

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn bg={"navys.4"} display={r("none -------> flex")}>
          <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
            <DropDown
              mb={4}
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
              <NavItem text="Logout" icon={<LogOut />} />
            </Flex>
          </Flex>
        </LeftColumn>
        <ConnectedRightColumn bg={"navys.4"}>
          <Home key={"home"} />
          <FindDemos key={"findDemos"} />
        </ConnectedRightColumn>
      </Flex>
    </Section>
  );
};
