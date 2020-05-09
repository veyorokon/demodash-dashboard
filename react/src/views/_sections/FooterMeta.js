import React from "react";
import {Flex, Section, Box, Text, Link, Image} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";
import facebook from "assets/icons/social/facebook.svg";
import twitter from "assets/icons/social/twitter.svg";
import linkedin from "assets/icons/social/linkedin.svg";

let responsiveJustify = r("center ----> flex-start");

responsiveJustify = responsiveJustify.map(function(item) {
  return item === "flex" ? "flex-start" : item;
});

let responsiveRowJustify = responsiveJustify.map(function(item) {
  return item === "flex-start" ? "flex-end" : item;
});

const Icon = styled(Image)``;
const MetaText = styled(Text)`
  &:hover {
    color: black;
  }
`;

const MetaTag = props => (
  <MetaText
    fs={"1.2rem"}
    fw={700}
    color={"greys.0"}
    m="unset"
    mr={3}
    p={3}
    pl="unset"
    pr="unset"
  >
    <Link href={props.link}>{props.text}</Link>
  </MetaText>
);

const MetaIcon = props => (
  <Link href={props.link} mr={3}>
    <Icon
      w={r("2rem ----> 2.2rem")}
      h={r("2rem ----> 2.2rem")}
      src={props.icon}
      {...props}
    />
  </Link>
);

const MetaGroup = styled(Flex)`
  & > :last-child {
    margin: unset;
  }
`;

class FooterMeta extends React.Component {
  render() {
    return (
      <Section bg={"whites.1"} height={"fit-content"} overflow="hidden">
        <Box
          pt={r("4")}
          pb={r("4")}
          ml={r("2 ---> 3 -> 4 5 -> 7")}
          mr={r("2 ---> 3 -> 4 5 -> 7")}
        >
          <Flex
            justifyContent={responsiveJustify}
            flexDirection={r("column -----> row")}
            alignItems="center"
          >
            <MetaGroup mb={r("2 ----> 3 0")}>
              <MetaTag text={"Home"} link={"/"} />
              <MetaTag text={"Privacy"} link={"/legal/privacy"} />
              <MetaTag text={"Terms"} link={"/legal/terms"} />
              <MetaTag text={"Contact Us"} link={"/"} />
            </MetaGroup>
            <MetaGroup justifyContent={responsiveRowJustify}>
              <MetaIcon icon={facebook} link={"https://facebook.com"} />
              <MetaIcon icon={twitter} link={"https://twitter.com"} />
              <MetaIcon icon={linkedin} link={"https://linkedin.com"} />
            </MetaGroup>
          </Flex>
        </Box>
      </Section>
    );
  }
}
export default FooterMeta;
