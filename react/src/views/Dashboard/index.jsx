import React from "react";

import {validateToken, clearToken, getToken} from "lib";
// import {Home, Demos} from "./Views";
import {Home, Demos} from "./Views";
import {TwoColumn} from "./Components";
import {connect} from "react-redux";
import {updateAccountUserSet} from "redux/actions";
import {DropDown} from "components";
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";

import home from "assets/svg/dashboard/home.svg";

const headers = [
  {text: "Home", icon: home},
  {text: "Discover Demos", icon: home},
  {text: "My Demos", icon: home},
  {text: "Virtual Store", icon: home},
  {text: "Payout", icon: home},
  {text: "Profile", icon: home}
];

const ACCOUNT_USER_SET = gql`
  query accountUserSet($token: String!) {
    accountUserSet(token: $token) {
      id
      dateCreated
      role
      account {
        id
        type
        profile {
          id
          name
          industries {
            id
            choice
          }
        }
      }
    }
  }
`;

class Dashboard extends React.Component {
  componentDidMount() {
    const isTokenValid = validateToken();
    if (!isTokenValid) {
      clearToken();
      return this.props.history.push("/login");
    }
  }

  getDropdownNames = accountUserSet => {
    let profileList = [];
    accountUserSet.forEach(accountUser => {
      let name = accountUser.account.profile.name;
      let text = accountUser.account.type;
      if (name) text = name;
      profileList.push({text, id: accountUser.account.profile.id});
    });
    return profileList;
  };

  render() {
    return (
      <Query
        query={ACCOUNT_USER_SET}
        variables={{token: getToken()["token"]}}
        fetchPolicy="network-only"
      >
        {({loading, error, data}) => {
          if (error) return <div>Error</div>;
          if (loading || !data) return <div>Loading</div>;
          let profileNames = this.getDropdownNames(data.accountUserSet);
          let disabled = !profileNames.length;
          updateAccountUserSet(data);
          return (
            <TwoColumn
              tabHeaders={headers}
              disabled={disabled}
              profileNames={profileNames}
              dropdownComponent={
                <DropDown
                  useDefaultButton
                  onChange={e => console.log(e.target.value)}
                  options={profileNames}
                  defaultOption={"New account"}
                  onDefaultClick={() => console.log("test")}
                />
              }
            >
              <Home />
              <Demos />
            </TwoColumn>
          );
        }}
      </Query>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateAccountUserSet: payload => dispatch(updateAccountUserSet(payload))
  };
}

const ConnectedDashboard = connect(
  null,
  mapDispatchToProps
)(Dashboard);

export default ConnectedDashboard;
