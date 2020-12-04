import React from "react";
import {IconCard} from "views/Dashboard/Components";
import {CoinDollar} from "@styled-icons/icomoon/CoinDollar";
import {connect} from "react-redux";
import {useQuery} from "@apollo/react-hooks";
import {responsive as r, getToken} from "lib";
import {QUERY_TOTAL_ACCOUNT_VOLUME} from "views/Dashboard/gql";

const mapStateToProps = state => {
  return {
    accountUserId: parseInt(state.dashboard.currentAccountUser)
  };
};

function _TotalSales(props) {
  const {accountUserId} = props;
  const {loading, error, data} = useQuery(QUERY_TOTAL_ACCOUNT_VOLUME, {
    variables: {accountUserId, token: getToken().token},
    pollInterval: 5000,
    skip: !accountUserId
  });
  if (loading)
    return (
      <IconCard
        loading={loading}
        iconProps={{color: "greens.2", bg: "greens.3"}}
        mr={r("2")}
        mb={r("2")}
        icon={<CoinDollar />}
        value={"Loading..."}
        title={"Sales volume"}
      />
    );
  if (error)
    return (
      <IconCard
        iconProps={{color: "greens.2", bg: "greens.3"}}
        mr={r("2")}
        mb={r("2")}
        icon={<CoinDollar />}
        value={0}
        title={"Sales volume"}
      />
    );
  let value = 0;
  if (data && data.totalAccountVolume) value = data.totalAccountVolume.value;
  return (
    <IconCard
      iconProps={{color: "greens.2", bg: "greens.3"}}
      mr={r("2")}
      mb={r("2")}
      icon={<CoinDollar />}
      value={`$${value}`}
      title={"Sales volume"}
    />
  );
}
export default connect(
  mapStateToProps,
  null
)(_TotalSales);
