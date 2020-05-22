import React from "react";
import {LeftColumn, ConnectedRightColumn} from "./layout";
import {Flex, Section, DropDown} from "components";
import {NavItem, NavCategory} from "./Components";
import {Home, FindDemos} from "./Panels";
import {Home as HomeIcon} from "@styled-icons/boxicons-solid/Home";
import {LogOut} from "@styled-icons/boxicons-regular/LogOut";
import {connect} from "react-redux";
import {updatePanel} from "redux/actions";
import {responsive as r} from "lib";

const DemoerNav = props => {
  const {updatePanel} = props;
  return (
    <>
      <NavItem
        onClick={() => updatePanel("home")}
        text="Home"
        icon={<HomeIcon />}
      />
      <NavCategory mt={3} text={"Demos"} />
      <NavItem
        onClick={() => updatePanel("findDemos")}
        text="Find demos"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavItem
        onClick={() => updatePanel("myDemos")}
        text="My demos"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavItem
        onClick={() => updatePanel("demodashStore")}
        text="demodash store"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavCategory mt={3} text={"Account"} />
      <NavItem
        onClick={() => console.log("her")}
        text="Payout & billing"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavItem
        onClick={() => console.log("her")}
        text="Users"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavItem
        onClick={() => console.log("her")}
        text="Settings"
        icon={<HomeIcon />}
        ml={3}
      />
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    updatePanel: payload => dispatch(updatePanel(payload))
  };
}

const ConnectedDemoerNav = connect(
  null,
  mapDispatchToProps
)(DemoerNav);

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
              <ConnectedDemoerNav />
            </Flex>
            <Flex mt={4} flexGrow={0} w={"100%"} flexDirection="column">
              <NavItem text="Logout" icon={<LogOut />} />
            </Flex>
          </Flex>
        </LeftColumn>
        <ConnectedRightColumn>
          <Home key={"home"} />
          <FindDemos key={"findDemos"} />
        </ConnectedRightColumn>
      </Flex>
    </Section>
  );
};
