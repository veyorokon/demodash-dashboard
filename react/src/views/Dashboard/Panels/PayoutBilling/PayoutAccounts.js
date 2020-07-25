import React from "react";
import {Flex, Text, Box, Icon} from "components";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";
import {ACCOUNT_PAYOUT_SET} from "views/Dashboard/gql";
import {getToken, responsive as r} from "lib";
import styled from "styled-components";

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
  <Text letterSpacing="0.5px" fs={"1.6rem"} color={"whites.1"} {...props}>
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
  render() {
    const {props} = this;
    console.log(props);
    return (
      <Flex mt={1} flexGrow="0" flexDirection="column">
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
                <MonoText>Account ending:</MonoText>
                <MonoText>*{props.lastFour}</MonoText>
              </Flex>
              <Flex mt={2} alignItems="center" justifyContent="space-between">
                <MonoText>Routing:</MonoText>
                <MonoText>{props.routingNumber}</MonoText>
              </Flex>
            </Flex>
          </Flex>
        </Box>
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
              console.log(accountPayoutSet);
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
                        <BankComponent key={index} {...externalAccount.bank} />
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
