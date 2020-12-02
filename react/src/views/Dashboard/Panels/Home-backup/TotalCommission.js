import React from "react";
import {IconCard} from "views/Dashboard/Components";
import {HandHoldingUsd} from "@styled-icons/fa-solid/HandHoldingUsd";
import {connect} from "react-redux";
import {useQuery} from "@apollo/react-hooks";
import {responsive as r, getToken} from "lib";
import {QUERY_TOTAL_COMMISSION_GENERATED} from "views/Dashboard/gql";

const mapStateToProps = state => {
  return {
    accountUserId: parseInt(state.dashboard.currentAccountUser)
  };
};

function _TotalSales(props) {
  const {accountUserId} = props;
  const {loading, error, data} = useQuery(QUERY_TOTAL_COMMISSION_GENERATED, {
    variables: {accountUserId, token: getToken().token},
    pollInterval: 5000,
    skip: !accountUserId
  });
  if (loading)
    return (
      <IconCard
        loading={loading}
        iconProps={{color: "yellows.0", bg: "yellows.2"}}
        mr={r("2")}
        mb={r("2")}
        icon={<HandHoldingUsd />}
        value={"Loading..."}
        title={"Commission generated"}
      />
    );
  if (error)
    return (
      <IconCard
        iconProps={{color: "yellows.0", bg: "yellows.2"}}
        mr={r("2")}
        mb={r("2")}
        icon={<HandHoldingUsd />}
        value={""}
        title={"Commission generated"}
      />
    );
  let value = 0;
  if (data && data.totalCommissionGenerated)
    value = data.totalCommissionGenerated.value;
  return (
    <IconCard
      iconProps={{color: "yellows.0", bg: "yellows.2"}}
      mr={r("2")}
      mb={r("2")}
      icon={<HandHoldingUsd />}
      value={`$${value}`}
      title={"Commission generated"}
    />
  );
}
export default connect(
  mapStateToProps,
  null
)(_TotalSales);
