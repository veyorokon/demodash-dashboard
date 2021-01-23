import React from "react";
import {IconCard} from "views/Dashboard/Components";
import {Pricetags} from "@styled-icons/evaicons-solid/Pricetags";
import {connect} from "react-redux";
import {useQuery} from "@apollo/react-hooks";
import {responsive as r, getToken, clearToken} from "lib";
import {withRouter} from "react-router";
import {QUERY_TOTAL_ACCOUNT_SALES} from "views/Dashboard/gql";

const mapStateToProps = state => {
  return {
    accountUserId: parseInt(state.dashboard.currentAccountUser)
  };
};

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

function _TotalSales(props) {
  const {accountUserId} = props;
  const {loading, error, data} = useQuery(QUERY_TOTAL_ACCOUNT_SALES, {
    variables: {accountUserId, token: getToken().token},
    pollInterval: 5000,
    skip: !accountUserId
  });
  if (loading)
    return (
      <IconCard
        loading={loading}
        iconProps={{color: "blues.0", bg: "navys.3"}}
        mr={r("2")}
        mb={r("2")}
        icon={<Pricetags />}
        value={"Loading..."}
        title={"Total sales"}
      />
    );
  if (error)
    return (
      <IconCard
        onClick={logout(props, error)}
        iconProps={{color: "blues.0", bg: "navys.3"}}
        mr={r("2")}
        mb={r("2")}
        icon={<Pricetags />}
        value={""}
        title={"Total sales"}
      />
    );
  let value = 0;
  if (data && data.totalAccountSales) value = data.totalAccountSales.value;
  return (
    <IconCard
      iconProps={{color: "blues.0", bg: "navys.3"}}
      mr={r("2")}
      mb={r("2")}
      icon={<Pricetags />}
      value={value}
      title={"Total sales"}
    />
  );
}
export default connect(
  mapStateToProps,
  null
)(withRouter(_TotalSales));
