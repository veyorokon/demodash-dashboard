/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import React from "react";
import {Box, Flex, Text, Section, Button, DropDown, Image} from "components";
import {withRouter} from "react-router";
import styled, {css} from "styled-components";
import {responsive as r, clearToken, getToken} from "lib";
import {connect} from "react-redux";
import {updateAccountUserSet} from "redux/actions";

import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";
import signout from "assets/svg/dashboard/signout.svg";

const Hide = styled(Box)`
  transition: opacity 0.4s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  display: none;
  ${props =>
    props.showing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: block;
    `}
`;
const NavigationTabItem = styled(Button)`
  background: transparent;
  display: flex;
  height: 6rem;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  border: unset;
  border-left: 3px solid transparent;
  transition: border-left 0.2s linear;
  outline: none;
  &:hover {
    color: ${props => props.hoverColor || "white"};
  }
  ${props =>
    props.active &&
    css`
      background: #232e60;
      border-color: white;
    `}
`;
const Header = styled(Text)`
  transition: color 0.275s ease-in-out;
  outline: none;
  color: inherit;
`;
const ScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;
const LeftColumn = styled(ScrollContainer)`
  flex-grow: 20;
  height: 100vh;
  justify-content: space-around;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 0;
`;
const RightColumn = styled(ScrollContainer)`
  flex-grow: 80;
  height: 100vh;
  flex-basis: 44rem;
  overflow: auto;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;

const DashNav = styled(Flex)`
  position: fixed;
  align-items: center;
`;
const FlexBox = styled(Box)`
  flex-grow: 1;
`;

const ACCOUNT_USER_SET = gql`
  query accountUserSet($token: String!) {
    accountUserSet(token: $token) {
      id
      dateCreated
      role
      account {
        id
        type
        profile {
          id
          name
          industries {
            id
            choice
          }
        }
      }
    }
  }
`;

class TwoColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected || "Products"
    };
  }

  handleChange = key => {
    this.setState({selected: key});
  };

  handleLogout = () => {
    clearToken();
    return this.props.history.push("/login");
  };

  getDropdownNames = accountUserSet => {
    let profileList = [];
    accountUserSet.forEach(accountUser => {
      let name = accountUser.account.profile.name;
      let text = accountUser.account.type;
      if (name) text = name;
      profileList.push({text, id: accountUser.account.profile.id});
    });
    return profileList;
  };

  render() {
    const {selected} = this.state;
    console.log(selected);
    const {updateAccountUserSet} = this.props;
    return (
      <Section height={"fit-content"} overflow="hidden">
        <Flex h={"100vh"}>
          <Query
            query={ACCOUNT_USER_SET}
            variables={{token: getToken()["token"]}}
            fetchPolicy="network-only"
          >
            {({loading, error, data}) => {
              if (error) return <div>Error</div>;
              if (loading || !data) return <div>Loading</div>;
              let profileNames = this.getDropdownNames(data.accountUserSet);
              let disabled = !profileNames.length;
              updateAccountUserSet(data);
              return (
                <>
                  <LeftColumn bg={"darkBlues.0"}>
                    <Content
                      h="100%"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      w={"27rem"}
                    >
                      <Box textAlign="center" mt={3} mb={4} w={"100%"}>
                        <DropDown
                          useDefaultButton
                          onChange={e => console.log(e.target.value)}
                          options={profileNames}
                          defaultOption={"New account"}
                          onDefaultClick={() => console.log("test")}
                        />
                      </Box>
                      <FlexBox w={"100%"}>
                        {this.props.tabHeaders.map((elem, index) => {
                          const isActive = selected === elem.text;
                          const color = isActive ? "whites.0" : "greys.5";
                          if (elem.isCategory) {
                            return (
                              <NavigationTabItem
                                disabled={disabled}
                                // onClick={() => this.handleChange(index)}
                                key={elem.text}
                                active={isActive}
                                mb={1}
                                p={3}
                                color={color}
                                hoverColor={disabled ? "greys.5" : "white"}
                                w={"100%"}
                              >
                                {elem.icon && (
                                  <Image ml={3} mr={3} src={elem.icon} h={3} />
                                )}
                                <Header
                                  ml={!elem.icon && 3}
                                  w={"100%"}
                                  fw={500}
                                >
                                  {elem.text}
                                </Header>
                              </NavigationTabItem>
                            );
                          }
                          return (
                            <NavigationTabItem
                              disabled={disabled}
                              onClick={() => this.handleChange(elem.text)}
                              key={elem.text}
                              active={isActive}
                              mb={1}
                              p={3}
                              color={color}
                              hoverColor={disabled ? "greys.5" : "white"}
                              w={"100%"}
                            >
                              {elem.icon && (
                                <Image
                                  ml={elem.isSub ? 4 : 3}
                                  mr={3}
                                  src={elem.icon}
                                  h={3}
                                />
                              )}
                              <Header ml={!elem.icon && 3} w={"100%"} fw={500}>
                                {elem.text}
                              </Header>
                            </NavigationTabItem>
                          );
                        })}
                      </FlexBox>
                      <Box w={"100%"}>
                        <NavigationTabItem
                          onClick={this.handleLogout}
                          mb={1}
                          p={3}
                          color={"greys.5"}
                          hoverColor={"white"}
                          w={"100%"}
                        >
                          <Image ml={3} mr={3} src={signout} h={3} />
                          <Header mb={1} w={"100%"} fw={500}>
                            Logout
                          </Header>
                        </NavigationTabItem>
                      </Box>
                    </Content>
                  </LeftColumn>
                  <RightColumn
                    bg={"greys.4"}
                    h="fit-content"
                    justifyContent="flex-start"
                  >
                    <DashNav
                      w={"calc(100vw - 28rem)"}
                      p={3}
                      bg={"greys.4"}
                      h={5}
                    >
                      Navbar
                    </DashNav>
                    <Content mt={5} p={4} w={r("100%")} h="fit-content">
                      {this.props.children.length ? (
                        this.props.children.map((component, index) => {
                          console.log(component);
                          return (
                            <Hide
                              key={component.key}
                              showing={selected === component.key}
                            >
                              {React.cloneElement(component, {
                                active: selected === component.key
                              })}
                            </Hide>
                          );
                        })
                      ) : (
                        <Hide showing={true}>{this.props.children}</Hide>
                      )}
                    </Content>
                  </RightColumn>
                </>
              );
            }}
          </Query>
        </Flex>
      </Section>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateAccountUserSet: payload => dispatch(updateAccountUserSet(payload))
  };
}

const ConnectedTwoColumn = connect(
  null,
  mapDispatchToProps
)(TwoColumn);

export default withRouter(ConnectedTwoColumn);
