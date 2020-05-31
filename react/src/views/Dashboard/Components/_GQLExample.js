import React from "react";
import {DropDown} from "components";
import {Query} from "@apollo/react-components";
import {getToken} from "lib";
import {gql} from "apollo-boost";

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

class AccountUserDropDown extends React.Component {
  getAccounts(accountUsers) {
    let accountsByUser = [];
    for (let index in accountUsers) {
      let accountUser = accountUsers[index];
      let account = accountUser.account;
      let accountName = account.profile.name || account.type + " Account";
      accountsByUser.push({text: accountName, value: accountUser});
    }
    return accountsByUser;
  }

  render() {
    return (
      <Query
        query={USER__ACCOUNT_USER_SET}
        variables={{token: getToken().token}}
      >
        {({loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const {accountUsers} = data.user;

          return (
            <DropDown
              mb={4}
              br={2}
              color={"navys.1"}
              useDefaultButton
              onChange={e => console.log(e.target.value)}
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

export default AccountUserDropDown;
