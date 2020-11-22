import React from "react";
import {Flex, Text, Box, Icon} from "components";
import {FormButton} from "views/Dashboard/Components";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {Mutation, Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {
  ACCOUNT_CARD_SET,
  DELETE_CARD,
  SET_DEFAULT_CARD,
  QUERY_ACCOUNT_BILLABLE
} from "views/Dashboard/gql";
import {getToken, responsive as r} from "lib";
import styled from "styled-components";

import {Delete} from "@styled-icons/material/Delete";
import {CreditCard} from "@styled-icons/boxicons-solid/CreditCard";

const ScrollWrapper = styled(Flex)`
  overflow-x: scroll;
  width: 100%;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;
const CardWrapper = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
  & .rccs__card--front,
  .rccs__card--back {
    box-shadow: unset;
  }
`;

function formatYear(s) {
  return s.slice(-2);
}

function formatMonth(num, size = 2) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

class CardComponent extends React.Component {
  state = {
    focus: "",
    disabled: false
  };

  handleInputFocus = e => {
    this.setState({focus: e.target.name});
  };

  handleInputChange = e => {
    const {name, value} = e.target;

    this.setState({[name]: value});
  };

  async deleteCardMutation(deleteCard) {
    const {cardId, currentAccountUser} = this.props;
    this.setState({disabled: true});
    await deleteCard({
      variables: {
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser),
        cardId: parseInt(cardId)
      }
    });
    return this.setState({disabled: false});
  }
  async makeDefaultCardMutation(defaultCard) {
    const {cardId, currentAccountUser} = this.props;
    this.setState({disabled: true});
    await defaultCard({
      variables: {
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser),
        cardId: parseInt(cardId)
      }
    });
    return this.setState({disabled: false});
  }

  render() {
    const {currentAccountUser} = this.props;
    const {disabled} = this.state;
    return (
      <CardWrapper mt={1} {...this.props}>
        {this.props.isDefault && (
          <Text ml={2} color="greens.4" h="fit-content" mb={1}>
            Default card
          </Text>
        )}
        <Cards focused={this.state.focus} {...this.props} />
        <Flex justifyContent="space-evenly">
          {this.props.isDefault ? (
            <Flex flexGrow={0} w="45%" alignItems="flex-end" />
          ) : (
            <Mutation
              mutation={SET_DEFAULT_CARD}
              refetchQueries={[
                {
                  query: ACCOUNT_CARD_SET,
                  variables: {
                    token: getToken().token,
                    accountUserId: parseInt(currentAccountUser)
                  }
                }
              ]}
            >
              {defaultCard => (
                <FormButton
                  disabled={disabled}
                  mt={2}
                  bg={disabled ? "#7e88a2" : "navys.2"}
                  hoverBackground={disabled ? "#7e88a2" : "#0B1750"}
                  cursor={disabled ? "no-drop" : "pointer"}
                  w="45%"
                  title="Make default"
                  onClick={() => {
                    let conf = window.confirm(
                      "Make this your default card for purchases?"
                    );
                    if (conf) this.makeDefaultCardMutation(defaultCard);
                  }}
                >
                  <Flex alignItems="center">
                    <Icon color="whites.0" h="2.2rem" ml={2} mr={1}>
                      <CreditCard />
                    </Icon>
                    <Text color="whites.0" mr={3} ml={2}>
                      Make default
                    </Text>
                  </Flex>
                </FormButton>
              )}
            </Mutation>
          )}

          <Mutation
            mutation={DELETE_CARD}
            refetchQueries={[
              {
                query: ACCOUNT_CARD_SET,
                variables: {
                  token: getToken().token,
                  accountUserId: parseInt(currentAccountUser)
                }
              },
              {
                query: QUERY_ACCOUNT_BILLABLE,
                variables: {
                  token: getToken().token,
                  id: parseInt(currentAccountUser)
                }
              }
            ]}
          >
            {deleteCard => (
              <FormButton
                disabled={disabled}
                bg={disabled ? "#f7d899" : "yellows.1"}
                hoverBackground={disabled ? "#f7d899" : "#FFC651"}
                color={disabled ? "navys.1" : "navys.0"}
                cursor={disabled ? "no-drop" : "pointer"}
                mt={2}
                w="45%"
                title="Delete this card"
                onClick={() => {
                  let conf = window.confirm(
                    "Are you sure you want to delete this card?"
                  );
                  if (conf) this.deleteCardMutation(deleteCard);
                }}
              >
                <Flex alignItems="center">
                  <Icon h="2.2rem" ml={2} mr={1}>
                    <Delete />
                  </Icon>
                  <Text mr={2} ml={2}>
                    Delete card
                  </Text>
                </Flex>
              </FormButton>
            )}
          </Mutation>
        </Flex>
      </CardWrapper>
    );
  }
}

function _PaymentCards(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Cards
        </Text>
      </Flex>
      <ScrollWrapper
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        pb={2}
        mb={4}
      >
        {currentAccountUser && (
          <Query
            query={ACCOUNT_CARD_SET}
            variables={{
              token: getToken().token,
              accountUserId: parseInt(currentAccountUser)
            }}
          >
            {({loading, error, data}) => {
              if (loading)
                return (
                  <Box h="3.5rem" mb={4}>
                    <Text>Loading...</Text>
                  </Box>
                );
              if (error)
                return (
                  <Box h="3.5rem" mb={4}>
                    <Text>Error! {error.message}</Text>
                  </Box>
                );
              const {accountCardSet} = data;
              return (
                <Flex
                  w="fit-content"
                  mb={3}
                  alignItems="flex-end"
                  justifyContent="center"
                >
                  {accountCardSet && accountCardSet.length ? (
                    accountCardSet.map((card, index) => {
                      const formattedYear = formatYear(card.expYear);
                      const formattedMonth = formatMonth(card.expMonth);
                      return (
                        <CardComponent
                          key={index}
                          cardId={card.id}
                          mr={2}
                          ml={2}
                          cvc={""}
                          expiry={`${formattedMonth}${formattedYear}`}
                          name={`${card.name}`}
                          number={`------------${card.lastFour}`}
                          issuer={`${card.brand}`}
                          currentAccountUser={currentAccountUser}
                          isDefault={card.isDefault}
                          preview
                        />
                      );
                    })
                  ) : (
                    <Text color={"black"}>
                      You don't have any payment cards.
                    </Text>
                  )}
                </Flex>
              );
            }}
          </Query>
        )}
      </ScrollWrapper>
    </>
  );
}
const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

export default connect(
  mapStateToProps,
  null
)(_PaymentCards);
