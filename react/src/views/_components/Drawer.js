import React from "react";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {Grid, Image, Box, Link, Text, Flex, DropDown} from "components";

// import {CallToAction} from "views/_components";
import {AllNav} from "views/Dashboard/nav";
import {NavItem} from "views/Dashboard/Components";
import {LogoutBox} from "@styled-icons/remix-line/LogoutBox";

import {responsive as r, clearToken} from "lib";

import logo from "assets/svg/logo.svg";
import {connect} from "react-redux";
import {toggleNav} from "redux/actions";

import close from "assets/icons/close.svg";

function mapDispatchToProps(dispatch) {
  return {
    toggleNav: () => dispatch(toggleNav())
  };
}
const mapStateToProps = state => {
  const {navOpen} = state;
  return {
    navOpen
  };
};

const Icon = styled(Image)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const DrawerTitle = styled(Box)`
  align-items: center;
  grid-row: 1;
  display: flex;
  z-index: 60;
  justify-content: space-between;
`;
const DrawerContainer = styled(Grid)`
  position: fixed;
  top: 0;
  z-index: 50;
  grid-template-rows: 8rem 1fr;
  ${props =>
    props.open
      ? css`
          ${system({
            transform: true
          })}
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0.3, 0, 0, 1);
        `
      : css`
          transition-property: transform, -webkit-transform;
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
  border-right: 2px solid #ecedf1;
`;

const _Drawer = props => {
  const {toggleNav} = props;
  return (
    <DrawerContainer
      bg={"whites.0"}
      w={"100%"}
      h={"100%"}
      open={props.navOpen}
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
            <Link href={"/"}>demodash</Link>
          </Text>
        </Flex>
        <Icon
          w={"1.86rem"}
          h={"1.86rem"}
          cursor="pointer"
          src={close}
          onClick={toggleNav}
        />
      </DrawerTitle>
      <NavContainer ml={r("2 ---> 3")} mr={r("2 ---> 3")}>
        <Content
          h="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          w={"100%"}
          // w={"27rem"}
          // ml={r("unset --------> 6")}
        >
          <Flex w={"100%"} pt={5} pb={5} mb={5} flexDirection="column">
            <Flex pl={1} pr={1} alignItems="center" flexDirection="column">
              <Flex maxWidth="100%" w="fit-content" flexDirection="column">
                <Text mb={1}>Account:</Text>
                <DropDown
                  mb={4}
                  br={2}
                  w="27rem"
                  maxWidth="100%"
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
              </Flex>
            </Flex>
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
        </Content>
      </NavContainer>
    </DrawerContainer>
  );
};

const Drawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Drawer);

export default Drawer;
