import React from "react";
import {DropDown} from "components";

import {connect} from "react-redux";
import {updateCurrentAccountUser} from "redux/actions";

class _AccountUserDropDown extends React.Component {
  getAccounts(accountUserSet) {
    let accountsByUser = [];
    for (let index in accountUserSet) {
      let accountUser = accountUserSet[index];
      let account = accountUser.account;
      let accountName = account.profile.name || account.type + " Account";
      accountsByUser.push({
        text: accountName,
        value: accountUser.id
      });
    }
    return accountsByUser;
  }

  render() {
    const {
      accountUserSet,
      currentAccountUser,
      updateCurrentAccountUser
    } = this.props;
    const options = this.getAccounts(accountUserSet);
    return (
      <DropDown
        mb={4}
        br={2}
        color={"navys.1"}
        useDefaultButton
        onChange={e => updateCurrentAccountUser(e.target.value)}
        options={options}
        defaultButtonText={"Create an account"}
        defaultClick={() => console.log("test")}
        iconProps={{h: "2.4rem"}}
        value={currentAccountUser}
        {...this.props}
      />
    );
  }
}

const mapNavItemStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser,
    accountUserSet: state.dashboard.accountUserSet
  };
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
