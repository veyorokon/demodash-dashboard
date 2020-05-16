import React from "react";
import {getToken} from "lib";
import {Box, Text} from "components";
import styled from "styled-components";
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";

const BoxShadow = styled(Box)`
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.12),
    0 3px 6px 0 rgba(0, 0, 0, 0.12);
`;

const WelcomeBox = props => {
  return (
    <BoxShadow p={4} bg={"whites.0"} w="100%" h="22rem" br={"4px"}>
      <Text fs={"1.8rem"}>Welcome, {props.fullName}</Text>
    </BoxShadow>
  );
};

const USER = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      fullName
    }
  }
`;
export default props => {
  return (
    <Query
      query={USER}
      variables={{token: getToken()["token"]}}
      // fetchPolicy="network-only"
    >
      {({loading, error, data}) => {
        if (error) return <div>Error</div>;
        if (loading || !data) return <div>Loading</div>;
        return <WelcomeBox fullName={data.user.fullName} />;
      }}
    </Query>
  );
};
