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

const _NavItem = props => {
  const {id, selected} = props;
  return <NavItem active={selected === id} {...props} />;
};
const mapStateToProps = state => {
  return {selected: state.panel};
};

const ConnectedNavItem = connect(
  mapStateToProps,
  null
)(_NavItem);

const DemoerNav = props => {
  const {updatePanel} = props;
  return (
    <>
      <ConnectedNavItem
        id={"home"}
        onClick={() => updatePanel("home")}
        text="Home"
        icon={<HomeIcon />}
      />
      <NavCategory mt={3} text={"Demos"} />
      <ConnectedNavItem
        id={"findDemos"}
        onClick={() => updatePanel("findDemos")}
        text="Find demos"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"myDemos"}
        onClick={() => updatePanel("myDemos")}
        text="My demos"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"demodashStore"}
        onClick={() => updatePanel("demodashStore")}
        text="demodash store"
        icon={<HomeIcon />}
        ml={3}
      />
      <NavCategory mt={3} text={"Account"} />
      <ConnectedNavItem
        id={"payoutBilling"}
        onClick={() => updatePanel("payoutBilling")}
        text="Payout & billing"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"users"}
        onClick={() => updatePanel("users")}
        text="Users"
        icon={<HomeIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"settings"}
        onClick={() => updatePanel("settings")}
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
          <Flex w={"100%"} pt={5} pb={5} flexDirection="column">
            <DropDown
              mb={4}
              color={"navys.1"}
              useDefaultButton
              onChange={e => console.log(e.target.value)}
              options={[{text: "Cherry's Barbershop", value: "TestVal"}]}
              defaultOption={"New account"}
              defaultClick={() => console.log("test")}
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
