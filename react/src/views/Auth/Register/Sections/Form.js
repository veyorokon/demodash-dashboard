import React from "react";
import {Section, Box, Text, Flex, Image, Link, Hidden, Input} from "components";
import styled from "styled-components";
import {responsive as r} from "lib";
import {MultiForm} from "./Components";
import checkmark from "assets/svg/checkmark.svg";
import logo from "assets/svg/logo.svg";
import influencer from "assets/svg/influencer.svg";
import storefront from "assets/svg/storefront.svg";
import brand from "assets/svg/brand.svg";
import VertTabs, {TabPanel} from "./Components/VertTabs";

const LeftColumn = styled(Hidden)`
  flex-grow: 46;
  height: 100vh;
  justify-content: space-around;
  border-right: 1px solid #ddd;
  flex-basis: 37rem;
`;
const RightColumn = styled(Flex)`
  flex-grow: 54;
  height: 100vh;
  flex-basis: 44rem;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;
const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.8px;
`;
const Feature = props => (
  <Flex flexDirection="column" {...props}>
    <Flex mb={1} alignItems="center">
      <Image mt={1} mr={3} h="1.6rem" src={checkmark} />
      <Text as="p" fw={500} fs={r("1.6rem")} color="navys.1">
        {props.title}
      </Text>
    </Flex>
    <Text
      ml={4}
      letterSpacing={"-.2px"}
      lineHeight={"2rem"}
      as="p"
      fw={400}
      fs={r("1.4rem")}
      color="navys.2"
    >
      {props.text}
    </Text>
  </Flex>
);
const Footer = props => (
  <>
    <Link mr={3} h="fit-content" href="https://demodash.com">
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        &copy; demodash
      </Text>
    </Link>
    <Link mr={3} h="fit-content" href="https://demodash.com/legal/privacy">
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        Privacy
      </Text>
    </Link>
    <Link h="fit-content" href="https://demodash.com/legal/terms">
      <Text hoverColor={"#212C39"} fw={500} color="navys.2">
        Terms
      </Text>
    </Link>
  </>
);

const LogoTitle = props => (
  <Flex alignItems="center">
    <Link h="fit-content" href="https://demodash.com">
      <Image src={logo} h={"3rem"} />
    </Link>
    <Link h="fit-content" href="https://demodash.com">
      <Logo
        ml={4}
        mr={"auto"}
        as="h1"
        fs={r("3rem ------> 3.1rem")}
        color="navys.0"
      >
        demodash
      </Logo>
    </Link>
  </Flex>
);

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
        fs={r("1.8rem")}
        color="navys.2"
        textAlign={r("center")}
        letterSpacing="-0.5px"
        maxWidth="60rem"
      >
        {props.text}
      </Text>
      {props.children && props.children}
    </Box>
  </TabPanel>
);

const UserForm = props => (
  <Flex
    justifySelf="flex-start"
    mb={r("unset -----> auto")}
    flexGrow="0"
    flexDirection="column"
  >
    <Hidden height="fit-content" flexGrow="0" up={7}>
      <LogoTitle />
    </Hidden>
    <Text color="navys.0" mt={r("4")} mb={4} fs={"2rem"}>
      Create your account:
    </Text>
    <Text mb={3} color="navys.1" fs={"1.6rem"}>
      Email
    </Text>
    <Input height={"4.4rem"} mb={3} br={2} type="email" />

    <Text mb={3} color="navys.1" fs={"1.6rem"}>
      Full name
    </Text>
    <Input height={"4.4rem"} mb={3} br={2} />

    <Text mb={3} color="navys.1" fs={"1.6rem"}>
      Password
    </Text>
    <Input height={"4.4rem"} mb={3} br={2} type="password" />
    <Text mb={3} color="navys.1" fs={"1.6rem"}>
      Password confirmation
    </Text>
    <Input height={"4.4rem"} mb={3} br={2} type="password" />
  </Flex>
);

const AccountForm = props => (
  <Flex
    justifySelf="flex-start"
    mb={r("unset -----> auto")}
    flexGrow="0"
    flexDirection="column"
  >
    <Hidden height="fit-content" flexGrow="0" up={7}>
      <LogoTitle />
    </Hidden>
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

class RegistrationForm extends React.Component {
  render() {
    const anchor = window.location.hash.toLowerCase();
    const account =
      anchor === "#storefront" ? 1 : anchor === "#influencer" ? 2 : 0;
    return (
      <Section bg={"whites.0"} height={"fit-content"} overflow="hidden">
        <Flex h={"100vh"}>
          <LeftColumn down={6} bg={"navys.4"}>
            <Content
              ml={r("unset --------> 6")}
              justifyContent="space-around"
              w={"27rem"}
            >
              <Box mb={5} mt={5} w="100%">
                <LogoTitle />
                <Feature
                  mt={5}
                  title={"Free signup"}
                  text={
                    "Your email, name and a password is all you need to start."
                  }
                />
                <Feature
                  mt={4}
                  title={"Real-time purchases"}
                  text={
                    "From the dashboard, watch as you get sales in real-time."
                  }
                />
                <Feature
                  mt={4}
                  title={"Commission processing"}
                  text={"Automatically track commission sales and payouts."}
                />
              </Box>
              <Flex
                mb={4}
                alignItems={"flex-end"}
                w={"fit-content"}
                ml={"auto"}
                mr={"auto"}
                flexGrow="0"
              >
                <Footer />
              </Flex>
            </Content>
          </LeftColumn>
          <RightColumn h="fit-content" justifyContent="center" overflow="auto">
            <Content
              mt={r("4 ------> 6")}
              mb={r("4")}
              pl={3}
              pr={3}
              ml={"auto"}
              mr={"auto"}
              w={r("100% ---> 50rem --> 45rem")}
              h="fit-content"
            >
              <MultiForm
                minHeight="fit-content"
                h="60rem"
                callbacks={[
                  () => console.log("userform"),
                  () => console.log("accountform")
                ]}
                buttonText={["Continue", "Complete"]}
              >
                <UserForm />
                <AccountForm account={account} />
              </MultiForm>
              <Flex
                alignItems="flex-start"
                flexGrow={0}
                w={"fit-content"}
                ml={"auto"}
                mr={"auto"}
                mt={4}
              >
                <Text mr={2}>Already have an account? </Text>
                <Link href="/login">
                  <Text hoverColor={"#212C39"} color="navys.2">
                    Login
                  </Text>
                </Link>
              </Flex>
              <Hidden up={7}>
                <Flex
                  mt={4}
                  alignItems={"flex-end"}
                  w={"fit-content"}
                  h="fit-content"
                  ml={"auto"}
                  mr={"auto"}
                  flexGrow="0"
                >
                  <Footer />
                </Flex>
              </Hidden>
            </Content>
          </RightColumn>
        </Flex>
      </Section>
    );
  }
}
export default RegistrationForm;
