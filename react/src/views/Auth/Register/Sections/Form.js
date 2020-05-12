import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import styled from "styled-components";
import {responsive as r} from "lib";
import {MultiForm, ConnectedUserForm, AccountForm} from "./Forms";
import {Section, Box, Text, Flex, Image, Link, Hidden} from "components";
import {Mutation} from "@apollo/react-components";
import {setToken, clearToken, getToken} from "lib";
import {gql} from "apollo-boost";

import checkmark from "assets/svg/checkmark.svg";
import logo from "assets/svg/logo.svg";

const CREATE_USER = gql`
  mutation createUser($email: String!, $fullName: String, $password: String!) {
    createUser(email: $email, fullName: $fullName, password: $password) {
      token
      expiration
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation createAccount($token: String!, $type: String!) {
    createAccount(token: $token, type: $type) {
      account {
        id
        liveMode
        type
      }
    }
  }
`;

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

class RegistrationForm extends React.Component {
  componentDidMount() {
    clearToken();
  }

  async createUserMutation(createUser) {
    const {registrationForm} = this.props;
    const response = await createUser({
      variables: registrationForm
    });
    const {token, expiration} = response.data.createUser;
    setToken(token, expiration);
  }

  async createAccountMutation(createAccount) {
    const {accountForm} = this.props;
    const token = getToken()["token"];
    await createAccount({
      variables: {token: token, ...accountForm}
    });
    return this.props.history.push("/dashboard");
  }

  render() {
    const anchor = window.location.hash.toLowerCase().replace("#", "");
    const account =
      anchor === "storefront" ? 1 : anchor === "influencer" ? 2 : 0;
    const {registrationForm} = this.props;
    const createUserButtonDisabled =
      !registrationForm.isValidEmail || !registrationForm.isValidPassword;
    return (
      <Mutation mutation={CREATE_USER}>
        {createUser => (
          <Mutation mutation={CREATE_ACCOUNT}>
            {createAccount => (
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
                          text={
                            "Automatically track commission sales and payouts."
                          }
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
                  <RightColumn
                    h="fit-content"
                    justifyContent="center"
                    overflow="auto"
                  >
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
                          () => this.createUserMutation(createUser),
                          () => this.createAccountMutation(createAccount)
                        ]}
                        buttonText={["Continue", "Complete"]}
                        buttonDisabled={[createUserButtonDisabled, false]}
                      >
                        <ConnectedUserForm
                          header={
                            <Hidden height="fit-content" flexGrow="0" up={7}>
                              <LogoTitle />
                            </Hidden>
                          }
                        />
                        <AccountForm
                          header={
                            <Hidden height="fit-content" flexGrow="0" up={7}>
                              <LogoTitle />
                            </Hidden>
                          }
                          account={account}
                        />
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
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
const mapStateToProps = state => {
  return {
    registrationForm: state.registrationForm,
    accountForm: state.accountForm
  };
};

const ConnectedRegistrationForm = connect(
  mapStateToProps,
  null
)(RegistrationForm);

export default withRouter(ConnectedRegistrationForm);
