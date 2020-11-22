import React from "react";
import {DropDown} from "components";

import {connect} from "react-redux";
import {updateCurrentAccountUser, updatePanel} from "redux/actions";

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
      updateCurrentAccountUser,
      updatePanel
    } = this.props;
    const options = this.getAccounts(accountUserSet);
    return (
      <DropDown
        mb={4}
        br={2}
        color={"navys.1"}
        useDefaultButton
        onChange={e => {
          if (e.target.value !== "-1") updateCurrentAccountUser(e.target.value);
          else return updatePanel("createAccount");
        }}
        options={options}
        defaultButtonProps={{h: "3.5rem"}}
        defaultButtonText={"Create an account"}
        defaultOption={"Create an account"}
        defaultClick={() => updatePanel("createAccount")}
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
      dispatch(updateCurrentAccountUser(payload)),
    updatePanel: payload => dispatch(updatePanel(payload))
  };
}

export default connect(
  mapNavItemStateToProps,
  mapNavItemDispatchToProps
)(_AccountUserDropDown);
