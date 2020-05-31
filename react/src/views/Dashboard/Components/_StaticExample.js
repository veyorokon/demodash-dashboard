import React from "react";
import {DropDown} from "components";

const ACCOUNTS = [
  {
    role: "owner",
    id: 1,
    account: {type: "Storefront", profile: {name: "Cherry's Barbershop"}}
  },
  {
    role: "owner",
    id: 2,
    account: {type: "Brand", profile: {name: "Bromane"}}
  }
];

class AccountUserDropDown extends React.Component {
  getAccounts = props => {
    let accountsByUser = [];
    for (let index in ACCOUNTS) {
      let accountUser = ACCOUNTS[index];
      let account = accountUser.account;
      let accountName = account.profile.name || account.type + " Account";
      accountsByUser.push({text: accountName, value: accountUser.id});
    }
    return accountsByUser;
  };

  render() {
    return (
      <DropDown
        mb={4}
        br={2}
        color={"navys.1"}
        useDefaultButton
        onChange={e => console.log(e.target.value)}
        options={this.getAccounts()}
        defaultOption={"Create an account"}
        defaultClick={() => console.log("test")}
        iconProps={{h: "2.4rem"}}
      />
    );
  }
}

export default AccountUserDropDown;
