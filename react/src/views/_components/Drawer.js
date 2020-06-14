import React from "react";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {Grid, Image, Box, Text, Flex, Icon} from "components";
import {withRouter} from "react-router";

// import {CallToAction} from "views/_components";
import {
  BrandNav,
  DemoerNav
  // AllNav
} from "views/Dashboard/nav";
import {NavItem, AccountUserDropDown} from "views/Dashboard/Components";
import {LogoutBox} from "@styled-icons/remix-line/LogoutBox";

import {responsive as r, clearToken} from "lib";

import logo from "assets/svg/logo.svg";
import {connect} from "react-redux";
import {toggleNav} from "redux/actions";

import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";

function mapDispatchToProps(dispatch) {
  return {
    toggleNav: () => dispatch(toggleNav())
  };
}
const mapStateToProps = state => {
  const {navOpen} = state;
  const {currentAccountUser, accountUserSet} = state.dashboard;
  return {
    navOpen,
    currentAccountUser,
    accountUserSet
  };
};

const DrawerTitle = styled(Box)`
  align-items: center;
  grid-row: 1;
  display: flex;
  z-index: 60;
  justify-content: space-between;
`;
const DrawerContainer = styled(Grid)`
  position: absolute;
  top: 0;
  right: 0;
  grid-template-rows: 8rem 1fr;
  ${props =>
    props.open
      ? css`
          z-index: 50;
          ${system({
            transform: true
          })}
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
        `
      : css`
          z-index: -1;
          transition-property: transform, z-index;
          transition-duration: 0.3s;
          transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
          transform: translate3d(100vw, 0, 0);
        `};
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;

const ScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

const NavContainer = styled(ScrollContainer)`
  height: 100vh;
  justify-content: flex-start;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 25;
  border-right: 2px solid transparent;
`;

const _Drawer = props => {
  const {navOpen, toggleNav, currentAccountUser, accountUserSet} = props;
  let type;

  if (currentAccountUser) {
    const accountUser = accountUserSet.filter(
      option => option.id === currentAccountUser
    )[0];
    type = accountUser.account.type;
  }

  return (
    <DrawerContainer
      bg={"whites.0"}
      w={r("100% ---> 60% -> 50%")}
      h={"100%"}
      open={navOpen}
      {...props}
    >
      <DrawerTitle w={"100%"} h={"100%"} pl={4} pr={4}>
        <Flex
          justifySelf="flex-start"
          alignItems="center"
          justifyContent="center"
          flexGrow={0}
        >
          <Image mr={3} cursor="pointer" h={"3rem"} w={"auto"} src={logo} />
          <Text
            lineHeight={"1.5"}
            as="p"
            fw={700}
            fs={"2.4rem"}
            color="navys.0"
          >
            demodash
          </Text>
        </Flex>
        <Icon
          cursor="pointer"
          onClick={toggleNav}
          justifyContent="center"
          mr={3}
          h={"3rem"}
        >
          <CloseOutline />
        </Icon>
      </DrawerTitle>
      <NavContainer ml={r("2 ---> 3")} mr={r("2 ---> 3")}>
        <Content
          h="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          w={"100%"}
        >
          <Flex flexGrow={0} w={"100%"} pb={5} mb={5} flexDirection="column">
            <Flex
              flexGrow={0}
              pl={1}
              pr={1}
              alignItems={r("center")}
              flexDirection="column"
            >
              <Flex
                flexGrow={0}
                maxWidth="100%"
                w="fit-content"
                flexDirection="column"
              >
                <Text mb={1}>Account:</Text>
                <AccountUserDropDown w="27rem" maxWidth="100%" />
              </Flex>
            </Flex>
            <Flex w={"100%"} flexDirection="column">
              {type ? type === "Brand" ? <BrandNav /> : <DemoerNav /> : null}
              {/*<AllNav />*/}
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
        </Content>
      </NavContainer>
    </DrawerContainer>
  );
};

const Drawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Drawer);

export default withRouter(Drawer);
