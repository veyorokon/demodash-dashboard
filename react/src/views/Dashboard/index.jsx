import React from "react";
import Hero from "./Sections/Hero";
import {LeftColumn, RightColumn} from "./layout";
import {Flex, Section, DropDown} from "components";
import {NavItem, NavCategory} from "./Components";
import {Home} from "@styled-icons/boxicons-solid/Home";
import {LogOut} from "@styled-icons/boxicons-regular/LogOut";
import {responsive as r} from "lib";

const DemoerNav = props => (
  <>
    <NavItem onClick={() => console.log("her")} text="Home" icon={<Home />} />
    <NavCategory mt={3} text={"Demos"} />
    <NavItem
      onClick={() => console.log("her")}
      text="Find demos"
      icon={<Home />}
      ml={3}
    />
    <NavItem
      onClick={() => console.log("her")}
      text="My demos"
      icon={<Home />}
      ml={3}
    />
    <NavItem
      onClick={() => console.log("her")}
      text="demodash store"
      icon={<Home />}
      ml={3}
    />
    <NavCategory mt={3} text={"Account"} />
    <NavItem
      onClick={() => console.log("her")}
      text="Payout & billing"
      icon={<Home />}
      ml={3}
    />
    <NavItem
      onClick={() => console.log("her")}
      text="Users"
      icon={<Home />}
      ml={3}
    />
    <NavItem
      onClick={() => console.log("her")}
      text="Settings"
      icon={<Home />}
      ml={3}
    />
  </>
);

export default () => {
  return (
    <Section height={"fit-content"} overflow="hidden">
      <Flex h={"100vh"}>
        <LeftColumn display={r("none -------> flex")}>
          <Flex w={"100%"} pt={5} pb={4} flexDirection="column">
            <DropDown
              mb={4}
              color={"navys.1"}
              useDefaultButton
              onChange={e => console.log(e.target.value)}
              options={[{text: "Cherry's Barbershop", value: "TestVal"}]}
              defaultOption={"New account"}
              onDefaultClick={() => console.log("test")}
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
        <RightColumn>
          <Hero />
        </RightColumn>
      </Flex>
    </Section>
  );
};
