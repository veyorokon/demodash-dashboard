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
    pollInterval: 4000,
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
  if (error) return `Error! ${error.message}`;
  let value = 0;
  if (data) value = data.totalAccountVolume.value;
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
