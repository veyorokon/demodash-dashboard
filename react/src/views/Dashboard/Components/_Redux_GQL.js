import React from "react";
import {DropDown} from "components";
import {Query} from "@apollo/react-components";
import {getToken} from "lib";
import {gql} from "apollo-boost";

import {connect} from "react-redux";
import {updateCurrentAccountUser} from "redux/actions";

const USER__ACCOUNT_USER_SET = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      accountUsers {
        role
        account {
          id
          type
          profile {
            id
            name
          }
        }
      }
    }
  }
`;

class _AccountUserDropDown extends React.Component {
  getAccounts(accountUsers) {
    let accountsByUser = [];
    for (let index in accountUsers) {
      let accountUser = accountUsers[index];
      let account = accountUser.account;
      let accountName = account.profile.name || account.type + " Account";
      accountsByUser.push({
        text: accountName,
        value: accountUser
      });
    }
    return accountsByUser;
  }

  render() {
    const {token} = getToken();
    const {currentAccountUser, updateCurrentAccountUser} = this.props;
    console.log(currentAccountUser);
    console.log(this.props);
    return (
      <Query query={USER__ACCOUNT_USER_SET} variables={{token}}>
        {({loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const {accountUsers} = data.user;
          if (!currentAccountUser) updateCurrentAccountUser(accountUsers[0]);
          return (
            <DropDown
              mb={4}
              br={2}
              color={"navys.1"}
              useDefaultButton
              onChange={e => updateCurrentAccountUser(e.target.value)}
              options={this.getAccounts(accountUsers)}
              defaultOption={"Create an account"}
              defaultClick={() => console.log("test")}
              iconProps={{h: "2.4rem"}}
            />
          );
        }}
      </Query>
    );
  }
}

const mapNavItemStateToProps = state => {
  return {currentAccountUser: state.dashboard.currentAccountUser};
};

function mapNavItemDispatchToProps(dispatch) {
  return {
    updateCurrentAccountUser: payload =>
      dispatch(updateCurrentAccountUser(payload))
  };
}

export default connect(
  mapNavItemStateToProps,
  mapNavItemDispatchToProps
)(_AccountUserDropDown);
