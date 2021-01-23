import React from "react";
import {Query} from "@apollo/react-components";
import {Box, Text} from "components";
import {getToken, clearToken} from "lib";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {updateAccountUserSet} from "redux/actions";
import {USER__ACCOUNT_USER_SET} from "views/Dashboard/gql";

function logout(props, error) {
  if (
    props &&
    props.history &&
    error.message.includes("Signature has expired")
  ) {
    clearToken();
    return props.history.push("/login");
  }
}

class _QueryAccountUsers extends React.Component {
  render() {
    const {props} = this;
    const {token} = getToken();
    const {updateAccountUserSet} = this.props;
    return (
      <Query query={USER__ACCOUNT_USER_SET} variables={{token}}>
        {({loading, error, data}) => {
          if (loading)
            return (
              <Box h="3.5rem">
                <Text>Loading...</Text>
              </Box>
            );
          if (error)
            return (
              <Box h="3.5rem" mb={4}>
                <Text onClick={logout(props, error)}>
                  Error! {error.message}
                </Text>
              </Box>
            );
          const {accountUsers} = data.user;
          updateAccountUserSet(accountUsers);
          return <Box display="none" />;
        }}
      </Query>
    );
  }
}

function mapNavItemDispatchToProps(dispatch) {
  return {
    updateAccountUserSet: payload => dispatch(updateAccountUserSet(payload))
  };
}

export default connect(
  null,
  mapNavItemDispatchToProps
)(withRouter(_QueryAccountUsers));
