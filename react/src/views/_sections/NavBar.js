import React from "react";
import {Box, Flex, Text, Link, Hidden, Image} from "components";
import styled from "styled-components";
import {CallToAction} from "views/_components";
import {
  ecommerceLinks,
  storefrontLinks,
  influencerLinks
} from "views/_constants";
import {responsive as r} from "lib";
import menu from "assets/icons/menu.svg";
import logo from "assets/svg/logo.svg";
// import storefront from "assets/svg/nav/store.svg";
// import influencer from "assets/svg/nav/influencer.svg";

import {connect} from "react-redux";
import {toggleNav} from "redux/actions";

function mapDispatchToProps(dispatch) {
  return {
    toggleNav: () => dispatch(toggleNav())
  };
}

const Nav = styled(Box)`
  background-color: white;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.1);
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  + section {
    padding-top: 6.4rem;
  }
`;

const NavFlex = styled(Flex)``;

const NavContainer = styled(Flex)`
  height: 100%;
  align-items: center;
  border-bottom: none;
`;

const NavLink = props => (
  <Text
    fs={r("1.4rem --------> 1.6rem")}
    fw={500}
    color={"navys.1"}
    m="unset"
    mr={3}
    ml={3}
    p={3}
    pl="unset"
    pr="unset"
    {...props}
  >
    <Link href={props.link} {...props}>
      {props.text}
    </Link>
  </Text>
);
const LoginOptions = () => (
  <>
    <CallToAction
      link={"/register"}
      w={r("15rem")}
      fs={r("1.4rem")}
      fw={600}
      h="3.8rem"
      bg={"oranges.1"}
      hoverBg={"#212C39"}
      hoverColor={"white"}
      br={4}
      color="whites.0"
    >
      Get Started
    </CallToAction>
    <NavLink text="Sign In &#x2192;" link={"/login"} />
  </>
);
const DropdownContent = styled(Box)`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 3px 4px rgba(3, 27, 78, 0.1);
  padding: 12px 16px;
  z-index: 10;
  border-radius: 0 0 6px 6px;
`;
const DropdownContainer = styled(Flex)`
  position: relative;
  display: inline-block;
  height: 100%;
  &:hover ${DropdownContent} {
    display: block;
  }
  &:hover {
    background-color: #f9f9f9;
  }
`;
const DropdownTitle = styled(Text)`
  display: flex;
  align-items: center;
`;
const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const DropdownItem = props => (
  <DropdownContainer cursor="default" alignItems="center">
    <DropdownTitle
      fs={r("1.4rem --------> 1.6rem")}
      fw={500}
      color={"navys.1"}
      m="unset"
      mr={3}
      ml={3}
      p={3}
      pl="unset"
      pr="unset"
      h="100%"
    >
      {props.title}
    </DropdownTitle>
    <DropdownContent w="25rem">
      {props.links &&
        props.links.map((link, index) => (
          <DropdownLink
            fw={400}
            pt={2}
            pb={2}
            mt={2}
            w="100%"
            cursor="pointer"
            href={`${link.link}`}
            key={index}
          >
            {link.icon && (
              <Image
                bg="navys.3"
                br={"50%"}
                mr={3}
                p={"2px"}
                cursor="pointer"
                h={"3rem"}
                w={"3rem"}
                src={link.icon}
              />
            )}
            {link.text}
          </DropdownLink>
        ))}
    </DropdownContent>
  </DropdownContainer>
);

const _NavBar = props => {
  const {toggleNav} = props;
  const TRANSITION = 8;
  return (
    <Nav>
      <NavFlex
        alignItems="center"
        justifyContent={"space-between"}
        w="auto"
        h={5}
        ml={r("2 3 4 ---> 5 ---> 6 7")}
        mr={r("2 3 4 ---> 5 ---> 6 7")}
      >
        <NavContainer alignItems="center" w={"10rem"}>
          <Hidden alignItems="center" down={TRANSITION}>
            <Image mr={3} cursor="pointer" h={"3rem"} w={"auto"} src={logo} />
          </Hidden>
          <Hidden alignItems="center" up={8}>
            <Image mr={3} cursor="pointer" h={"3rem"} w={"auto"} src={logo} />
          </Hidden>
          <Text
            lineHeight={"1.5"}
            as="p"
            fw={700}
            fs={"2.4rem"}
            color="navys.0"
          >
            <Link href={"/"}>demodash</Link>
          </Text>
        </NavContainer>

        <NavContainer
          flexGrow={r("0 -------> 1")}
          justifyContent="space-around"
        >
          <Hidden overflow="inherit" alignItems="center" down={TRANSITION - 1}>
            <DropdownItem title="For Products" links={ecommerceLinks} />
            <DropdownItem title="For Storefronts" links={storefrontLinks} />
            <DropdownItem title="For Influencers" links={influencerLinks} />
            <NavLink mr={0} text="Pricing" link={"/how-it-works#billing"} />
          </Hidden>
        </NavContainer>
        <NavContainer flexGrow={r("0 -------> 1")} justifyContent="flex-end">
          <Hidden alignItems="center" down={TRANSITION - 1}>
            <LoginOptions />
          </Hidden>
          <Hidden alignItems="center" up={TRANSITION}>
            <Image
              onClick={toggleNav}
              cursor="pointer"
              h={"3rem"}
              w={"auto"}
              src={menu}
            />
          </Hidden>
        </NavContainer>
      </NavFlex>
    </Nav>
  );
};

const NavBar = connect(
  null,
  mapDispatchToProps
)(_NavBar);

export default NavBar;
