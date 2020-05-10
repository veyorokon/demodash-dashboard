import {Flex, Text, Image, Box} from "components";
import React from "react";
import {responsive as r} from "lib";
import VertTabs, {TabPanel} from "./VertTabs";
import influencer from "assets/svg/influencer.svg";
import storefront from "assets/svg/storefront.svg";
import brand from "assets/svg/brand.svg";

const Panel = props => (
  <TabPanel
    height={"100%"}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-around"
  >
    <Image mb={4} mt={4} maxWidth={"100%"} h={r("16rem ")} src={props.svg} />
    <Box>
      <Text
        lineHeight={"1.5"}
        as="p"
        fw={400}
        fs={r("1.6rem --> 1.8rem")}
        color="navys.2"
        textAlign={r("center")}
        letterSpacing="-0.5px"
        maxWidth="100%"
      >
        {props.text}
      </Text>
      {props.children && props.children}
    </Box>
  </TabPanel>
);

export default function AccountForm(props) {
  return (
    <Flex
      justifySelf="flex-start"
      mb={r("unset -----> auto")}
      flexGrow="0"
      flexDirection="column"
    >
      {props.header && props.header}
      <Text color="navys.0" mt={r("4")} mb={4} fs={"2rem"}>
        Choose your account type:
      </Text>
      <Flex mt={3} h="100%">
        <VertTabs
          tabHeaders={["Brand", "Storefront", "Influencer"]}
          selected={props.account}
        >
          <Panel
            text={
              "You ship demo products to storefronts and influencers; and purchases to customers."
            }
            svg={brand}
          ></Panel>
          <Panel
            text={
              "Demo products on customers at your storefront and earn commission for each sale."
            }
            svg={storefront}
          ></Panel>
          <Panel
            text={
              "Demo products for followers on your social media and earn commission for each sale."
            }
            svg={influencer}
          ></Panel>
        </VertTabs>
      </Flex>
    </Flex>
  );
}
