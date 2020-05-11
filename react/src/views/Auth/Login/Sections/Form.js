import React from "react";
import {Section, Box, Text, Flex, Link, Input, Button} from "components";
import styled from "styled-components";
import {
  responsive as r,
  getEventVal,
  validateToken,
  setToken,
  clearToken,
  formatErrorMessage
} from "lib";
import {connect} from "react-redux";
import {updateLoginForm} from "redux/actions";
import {withRouter} from "react-router";

import {Mutation} from "@apollo/react-components";
import {gql} from "apollo-boost";

const FlexSection = styled(Section)`
  height: 100vh;
  min-height: 80rem;
  overflow: hidden;
`;

const FormBox = styled(Flex)`
  transition: box-shadow 0.2s, width 0.3s, padding 0.2s;
`;

const SubmitButton = styled(Button)`
  height: ${props =>
    props.height ? props.height : props.h ? props.h : "5rem"};
  cursor: pointer;
  min-width: fit-content;
  border: none;
  outline: none;
  letter-spacing: 0.2px;
  transition: width 0.3s ease-in-out;

  &:hover {
    color: ${props => props.hoverColor || "black"};
    background: ${props => props.hoverBg || "none"};
  }
`;

const formShadow = [
  "unset",
  "unset",
  "unset",
  "unset",
  "rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px"
];

const AUTH_USER = gql`
  mutation authUser($email: String!, $password: String!) {
    authUser(email: $email, password: $password) {
      token
      expiration
    }
  }
`;

class LoginForm extends React.Component {
  componentDidMount() {
    const isTokenValid = validateToken();
    if (isTokenValid) return this.props.history.push("/dashboard");
    return clearToken();
  }

  async authUserMutation(authUser) {
    const {loginForm} = this.props;
    try {
      const response = await authUser({
        variables: loginForm
      });
      const {token, expiration} = response.data.authUser;
      setToken(token, expiration);
      return this.props.history.push("/dashboard");
    } catch (error) {
      const {updateLoginForm} = this.props;
      let errorMessage = formatErrorMessage(
        error,
        "Invalid credentials. Check username and password."
      );
      return updateLoginForm({...loginForm, errorMessage: errorMessage});
    }
  }

  render() {
    const {updateLoginForm, loginForm} = this.props;
    return (
      <Mutation mutation={AUTH_USER}>
        {authUser => (
          <FlexSection bg={"navys.4"} height={"fit-content"} overflow="hidden">
            <Box
              h={r("17vh ---> 20vh")}
              minHeight={r("12rem ---> 17rem")}
              ml={"auto"}
              mr={"auto"}
              pt={r("5")}
              pb={r("0 ---> 3")}
            >
              <Flex
                justifyContent="flex-start"
                flexDirection="column"
                alignItems="center"
              >
                <Link h="fit-content" href="https://demodash.com">
                  <Text
                    textAlign="center"
                    lineHeight={"1.5"}
                    as="h1"
                    fw={r("600")}
                    fs={r("3rem --> 3.4rem")}
                    color="navys.1"
                    letterSpacing={"-.8px"}
                    hoverColor={"#212C39"}
                  >
                    demodash
                  </Text>
                </Link>
              </Flex>
            </Box>

            <Flex
              ml={"auto"}
              mr={"auto"}
              pt={r("2")}
              pb={3}
              flexDirection="column"
              h={"80vh"}
              minHeight={"fit-content"}
            >
              <FormBox
                flexDirection="column"
                br={r("0 ---> 3px")}
                bg="whites.0"
                w={r("52rem ---> 48rem")}
                maxWidth="100%"
                maxHeight={"48rem"}
                ml={"auto"}
                mr={"auto"}
                mb={r("0 ---> 4")}
                p={r("3 -> 4")}
                boxShadow={formShadow}
              >
                <Text color="navys.0" mt={r("4")} mb={4} fs={"2.2rem"}>
                  Login to your account
                </Text>
                <Text mb={3} color="navys.1" fs={"1.6rem"}>
                  Email
                </Text>
                <Input
                  autocapitalize="none"
                  height={"4.4rem"}
                  mb={3}
                  br={2}
                  type="email"
                  onChange={evt =>
                    updateLoginForm({
                      ...loginForm,
                      email: getEventVal(evt),
                      errorMessage: ""
                    })
                  }
                />

                <Text mb={3} color="navys.1" fs={"1.6rem"}>
                  Password
                </Text>
                <Input
                  width="100%"
                  height={"4.4rem"}
                  mb={2}
                  br={2}
                  type="password"
                  onChange={evt =>
                    updateLoginForm({
                      ...loginForm,
                      password: getEventVal(evt),
                      errorMessage: ""
                    })
                  }
                />
                {loginForm.errorMessage && (
                  <Text mb={3} color={"oranges.0"}>
                    {loginForm.errorMessage}
                  </Text>
                )}
                <SubmitButton
                  hoverBg="#173bd0"
                  minHeight="5rem"
                  mt={loginForm.errorMessage ? 2 : 4}
                  br={3}
                  bg={"blues.0"}
                  onClick={() => this.authUserMutation(authUser)}
                >
                  <Text
                    fw={600}
                    ml="auto"
                    mr="auto"
                    color="whites.0"
                    fs={"1.6rem"}
                  >
                    Login
                  </Text>
                </SubmitButton>

                <Flex
                  alignItems="flex-end"
                  w={"fit-content"}
                  ml={"auto"}
                  mr={"auto"}
                  mt={4}
                  mb={4}
                >
                  <Text mr={2}>Don't have an account? </Text>
                  <Link href="/register">
                    <Text hoverColor={"#212C39"} color="navys.2">
                      Sign up
                    </Text>
                  </Link>
                </Flex>
              </FormBox>

              <Flex
                pb={3}
                alignItems={"flex-end"}
                w={"fit-content"}
                ml={"auto"}
                mr={"auto"}
              >
                <Link mr={3} h="fit-content" href="https://demodash.com">
                  <Text hoverColor={"#212C39"} fw={500} color="navys.2">
                    &copy; demodash
                  </Text>
                </Link>
                <Link
                  mr={3}
                  h="fit-content"
                  href="https://demodash.com/legal/privacy"
                >
                  <Text hoverColor={"#212C39"} fw={500} color="navys.2">
                    Privacy
                  </Text>
                </Link>
                <Link h="fit-content" href="https://demodash.com/legal/terms">
                  <Text hoverColor={"#212C39"} fw={500} color="navys.2">
                    Terms
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </FlexSection>
        )}
      </Mutation>
    );
  }
}

const mapStateToProps = state => {
  return {loginForm: state.loginForm};
};
function mapDispatchToProps(dispatch) {
  return {
    updateLoginForm: payload => dispatch(updateLoginForm(payload))
  };
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default withRouter(ConnectedLoginForm);
