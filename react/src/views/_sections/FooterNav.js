import React from "react";
import {Flex, Section, Box, Text, Grid, Image, Link} from "components";
import {
  ecommerceLinks,
  storefrontLinks,
  influencerLinks
} from "views/_constants";
import {responsive as r} from "lib";
import styled from "styled-components";
import logo from "assets/svg/logo.svg";

const Logo = styled(Image)``;

const GridItemFlex = styled(Flex)`
  flex: 1 1 auto;
  flex-direction: column;
`;

const GridItem = props => (
  <GridItemFlex alignItems={r("center -----> initial")}>
    <Text
      color={"navys.0"}
      fs={"1.4rem"}
      textTransform={"uppercase"}
      m="unset"
      p={2}
      pl="unset"
      pr="unset"
      fw={600}
    >
      {props.title}
    </Text>
    {props.links.map((link, index) => (
      <Text
        fw={500}
        key={index}
        color={"greys.0"}
        m="unset"
        p={2}
        pl="unset"
        pr="unset"
      >
        <Link href={`${link.link}`}>{link.text}</Link>
      </Text>
    ))}
  </GridItemFlex>
);

export default class FooterNav extends React.Component {
  render() {
    return (
      <Section
        border={"1px solid #eee"}
        borderLeft="unset"
        borderRight="unset"
        borderBottom="unset"
        bg={"whites.0"}
        height={"fit-content"}
        overflow="hidden"
      >
        <Box
          ml={r("2 ---> 3 -> 4 5 -> 7")}
          mr={r("2 ---> 3 -> 4 5 -> 7")}
          pt={r("4 -----> 5")}
          pb={r("4 -----> 5")}
        >
          <Flex
            flexDirection={r("column -----> row")}
            justifyContent="space-between"
          >
            <Link href={"/"}>
              <Logo
                mb={4}
                src={logo}
                w={r("6rem -----> 7rem")}
                h={r("6rem -----> 7rem")}
              />
            </Link>
            <Grid
              minHeight={r("30rem ----> initial")}
              overflow="hidden"
              gridRowGap="5%"
              gridTemplateColumns={r("repeat(2,1fr) ----> repeat(3,1fr)")}
              w={r("100% -----> 65%")}
            >
              <GridItem
                title="Products"
                links={ecommerceLinks}
                {...this.props}
              />
              <GridItem
                title="Storefronts"
                links={storefrontLinks}
                {...this.props}
              />
              <GridItem
                title="Influencers"
                links={influencerLinks}
                {...this.props}
              />
            </Grid>
          </Flex>
        </Box>
      </Section>
    );
  }
}
