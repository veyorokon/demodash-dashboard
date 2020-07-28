import React from "react";
import {Flex, Text, Box, Icon} from "components";
import {FormButton} from "views/Dashboard/Components";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {Mutation, Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {
  ACCOUNT_PAYOUT_SET,
  DELETE_EXTERNAL_ACCOUNT,
  SET_DEFAULT_EXTERNAL_ACCOUNT
} from "views/Dashboard/gql";
import {getToken, responsive as r, formatGQLErrorMessage} from "lib";
import styled from "styled-components";

import {Delete} from "@styled-icons/material/Delete";
import {MoneyDollarCircle} from "@styled-icons/remix-fill/MoneyDollarCircle";

import {Bank as BankIcon} from "@styled-icons/remix-fill/Bank";

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

const TextTitle = styled(Text)`
  text-transform: capitalize;
`;
const MonoText = props => (
  <Text fontFamily="mono" fs={"1.6rem"} color={"whites.1"} {...props}>
    {props.children}
  </Text>
);

class CardComponent extends React.Component {
  render() {
    return (
      <CardWrapper mt={1} {...this.props}>
        <Cards {...this.props} />
      </CardWrapper>
    );
  }
}

class BankComponent extends React.Component {
  state = {
    disabled: false
  };

  async deleteExternalAccountMutation(deleteExternalAccount) {
    const {id, currentAccountUser} = this.props;
    this.setState({disabled: true});
    try {
      await deleteExternalAccount({
        variables: {
          token: getToken().token,
          accountUserId: parseInt(currentAccountUser),
          externalAccountId: parseInt(id)
        }
      });
      return this.setState({disabled: false});
    } catch (error) {
      let gqlError = formatGQLErrorMessage(error, "");
      alert(gqlError.errorMessage);
      return this.setState({disabled: true});
    }
  }

  async makeDefaultPayoutMutation(defaultCard) {
    const {id, currentAccountUser} = this.props;
    this.setState({disabled: true});
    await defaultCard({
      variables: {
        token: getToken().token,
        accountUserId: parseInt(currentAccountUser),
        externalAccountId: parseInt(id)
      }
    });
    return this.setState({disabled: false});
  }

  render() {
    const {props} = this;
    const {currentAccountUser} = props;
    const {disabled} = this.state;
    return (
      <Flex mt={1} flexGrow="0" flexDirection="column" {...props}>
        {this.props.isDefault && (
          <Text ml={2} color="greens.4" h="fit-content" mb={1}>
            Default payout
          </Text>
        )}
        <Box
          p={3}
          pr={4}
          pl={4}
          bg={"linear-gradient(25deg, #23335a 0%, #5c5bff 100%);"}
          br={4}
          w={"29rem"}
          h={"18.286rem"}
        >
          <Flex h="100%" justifyContent="space-between" flexDirection="column">
            <Flex
              flexGrow={0}
              alignItems="center"
              justifyContent="space-between"
            >
              <Icon color={"whites.0"} w="fit-content" h={"2.6rem"}>
                <BankIcon />
              </Icon>
              <TextTitle
                w="fit-content"
                maxWidth="100%"
                h="fit-content"
                fw={"500"}
                fs="2rem"
                color={"whites.0"}
                textAlign="right"
              >
                {props.bankName.toLowerCase()}
              </TextTitle>
            </Flex>
            <Flex mb={2} flexGrow={0} flexDirection="column">
              <Flex alignItems="center" justifyContent="space-between">
                <MonoText>Account:</MonoText>
                <MonoText>-------- {props.lastFour}</MonoText>
              </Flex>
              <Flex
                mb={1}
                mt={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <MonoText>Routing:</MonoText>
                <MonoText>{props.routingNumber}</MonoText>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Flex justifyContent="space-evenly">
          {this.props.isDefault ? (
            <Flex h="4.3rem" flexGrow={0} w="45%" alignItems="flex-end" />
          ) : (
            <Mutation
              mutation={SET_DEFAULT_EXTERNAL_ACCOUNT}
              refetchQueries={[
                {
                  query: ACCOUNT_PAYOUT_SET,
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
                      "Make this your default payout account?"
                    );
                    if (conf) this.makeDefaultPayoutMutation(defaultCard);
                  }}
                >
                  <Flex alignItems="center">
                    <Icon color="whites.0" h="2.2rem" ml={2} mr={1}>
                      <MoneyDollarCircle />
                    </Icon>
                    <Text color="whites.0" mr={3} ml={2}>
                      Make default
                    </Text>
                  </Flex>
                </FormButton>
              )}
            </Mutation>
          )}

          {this.props.isDefault ? (
            <Flex h={"4.3rem"} flexGrow={0} w="45%" alignItems="flex-end" />
          ) : (
            <Mutation
              mutation={DELETE_EXTERNAL_ACCOUNT}
              refetchQueries={[
                {
                  query: ACCOUNT_PAYOUT_SET,
                  variables: {
                    token: getToken().token,
                    accountUserId: parseInt(currentAccountUser)
                  }
                }
              ]}
            >
              {deleteExternalAccount => (
                <FormButton
                  disabled={disabled}
                  bg={disabled ? "#f7d899" : "yellows.1"}
                  hoverBackground={disabled ? "#f7d899" : "#FFC651"}
                  color={disabled ? "navys.1" : "navys.0"}
                  cursor={disabled ? "no-drop" : "pointer"}
                  mt={2}
                  w="45%"
                  title="Delete this bank account"
                  onClick={() => {
                    let conf = window.confirm(
                      "Are you sure you want to delete this bank from your payouts?"
                    );
                    if (conf)
                      this.deleteExternalAccountMutation(deleteExternalAccount);
                  }}
                >
                  <Flex alignItems="center">
                    <Icon h="2.2rem" ml={2} mr={1}>
                      <Delete />
                    </Icon>
                    <Text mr={2} ml={2}>
                      Delete bank
                    </Text>
                  </Flex>
                </FormButton>
              )}
            </Mutation>
          )}
        </Flex>
      </Flex>
    );
  }
}

function _PayoutAccounts(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Payout accounts
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
            query={ACCOUNT_PAYOUT_SET}
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
              const {accountPayoutSet} = data;
              return (
                <Flex
                  w="fit-content"
                  mb={3}
                  alignItems="flex-end"
                  justifyContent="center"
                >
                  {accountPayoutSet && accountPayoutSet.length ? (
                    accountPayoutSet.map((externalAccount, index) => {
                      if (externalAccount.card) {
                        const {card} = externalAccount;
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
                      }
                      return (
                        <BankComponent
                          currentAccountUser={currentAccountUser}
                          key={index}
                          mr={2}
                          ml={2}
                          {...externalAccount.bank}
                        />
                      );
                    })
                  ) : (
                    <Text color={"black"}>
                      You don't have any payout accounts.
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
)(_PayoutAccounts);
