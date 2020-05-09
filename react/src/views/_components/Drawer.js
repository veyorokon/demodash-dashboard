import React from "react";
import styled, {css} from "styled-components";
import {system} from "styled-system";
import {Grid, Image, Box, Link, Text, Flex} from "components";
import {CallToAction} from "views/_components";

import {responsive as r} from "lib";
import logo from "assets/svg/logo.svg";
import {connect} from "react-redux";
import {toggleNav} from "redux/actions";

import close from "assets/icons/close.svg";
import {
  ecommerceLinks,
  storefrontLinks,
  influencerLinks
} from "views/_constants";

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

const _Drawer = props => {
  const {toggleNav} = props;
  return (
    <DrawerContainer bg={"whites.0"} w={"100%"} h={"100%"} open={props.navOpen}>
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
      <Flex p={3} flexDirection="column">
        <Flex flexDirection="column">
          <Text mb={2} fs={r("2rem ----> 2.4rem")}>
            For Products
          </Text>
          {ecommerceLinks.map((link, index) => (
            <Link
              fw={400}
              pt={2}
              pb={2}
              mt={2}
              fs={r("1.4rem ----> 1.6rem")}
              cursor="pointer"
              href={`${link.link}`}
              key={index}
            >
              {link.text}
            </Link>
          ))}
        </Flex>
        <Flex flexDirection="column">
          <Text mb={2} fs={r("2rem ----> 2.4rem")}>
            For Storefronts
          </Text>
          {storefrontLinks.map((link, index) => (
            <Link
              fw={400}
              pt={2}
              pb={2}
              mt={2}
              fs={r("1.4rem ----> 1.6rem")}
              cursor="pointer"
              href={`${link.link}`}
              key={index}
            >
              {link.text}
            </Link>
          ))}
        </Flex>
        <Flex flexDirection="column">
          <Text mb={2} fs={r("2rem ----> 2.4rem")}>
            For Influencers
          </Text>
          {influencerLinks.map((link, index) => (
            <Link
              fw={400}
              pt={2}
              pb={2}
              mt={2}
              fs={r("1.4rem ----> 1.6rem")}
              cursor="pointer"
              href={`${link.link}`}
              key={index}
            >
              {link.text}
            </Link>
          ))}
        </Flex>
        <Flex
          alignItems="center"
          flexDirection={r("column --> row")}
          justifyContent={"space-around"}
        >
          <CallToAction
            link={"/register"}
            mr={r("0 --> 2")}
            w={r("100% ---> 15rem")}
            fs={r("1.4rem")}
            fw={600}
            h="3.8rem"
            bg={"navys.0"}
            hoverBg={"oranges.1"}
            hoverColor={"white"}
            br={4}
            color="whites.0"
          >
            Login
          </CallToAction>
          <CallToAction
            link={"/register"}
            w={r("100% ---> 15rem")}
            fs={r("1.4rem")}
            fw={600}
            h="3.8rem"
            bg={"oranges.1"}
            hoverBg={"none"}
            hoverColor={"white"}
            br={4}
            color="whites.0"
          >
            Get Started
          </CallToAction>
        </Flex>
      </Flex>
    </DrawerContainer>
  );
};

const Drawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Drawer);

export default Drawer;
