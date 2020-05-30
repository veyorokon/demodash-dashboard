import React from "react";
import Analytics from "./Analytics";
import ProfileForm from "./ProfileForm";
import {Flex, Box, Icon} from "components";

import LogoIcon from "assets/svg/logo.js";
import {MenuOutline} from "@styled-icons/evaicons-outline/MenuOutline";
import {responsive as r} from "lib";
import styled from "styled-components";
import Drawer from "views/_components/Drawer";
import {connect} from "react-redux";
import {toggleNav} from "redux/actions";

function mapDispatchToProps(dispatch) {
  return {
    toggleNav: () => dispatch(toggleNav())
  };
}

const FlexCol = props => {
  return (
    <Flex
      w="fit-content"
      maxWidth="100%"
      m="auto"
      flexDirection="column"
      {...props}
    >
      {props.children}
    </Flex>
  );
};

const Layout = props => {
  return (
    <Box
      ml={r("2 ----> 3 ---->  auto")}
      mr={r("2 ----> 3 ---->  auto")}
      pl={r("1 ----> 4")}
      pr={r("1 ----> 4")}
      pt={r("5")}
      pb={r("5")}
    >
      <FlexCol>{props.children}</FlexCol>
    </Box>
  );
};

const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

const LogoTitle = props => (
  <Flex flexGrow={0} alignItems="center" mr={3} {...props}>
    <Icon justifyContent="center" mr={3} h={"3rem"}>
      <LogoIcon />
    </Icon>
    <Logo as="h1" fs={r("3rem ------> 3.1rem")} color="navys.0">
      demodash
    </Logo>
  </Flex>
);

const _NavBar = props => {
  const {toggleNav} = props;
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg={"whites.0"}
      h={5}
      {...props}
    >
      <Icon cursor="pointer" justifyContent="center" ml={3} mr={3} h={"3rem"}>
        <MenuOutline onClick={toggleNav} />
      </Icon>
      <LogoTitle />
    </Flex>
  );
};

const NavBar = connect(
  null,
  mapDispatchToProps
)(_NavBar);

export default function Home(props) {
  return (
    <>
      <Drawer display={r("grid -------> none")} />
      <NavBar display={r("flex -------> none")} />
      <Layout>
        <Analytics />
        <ProfileForm />
      </Layout>
    </>
  );
}
