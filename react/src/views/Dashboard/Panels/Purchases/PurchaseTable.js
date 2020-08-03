import React from "react";
import {Box, Flex, Text, Icon} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r, getToken} from "lib";
import {connect} from "react-redux";
import DataTable from "react-data-table-component";
import {Query} from "@apollo/react-components";
import {SALES} from "views/Dashboard/gql";

import {CheckCircle} from "@styled-icons/boxicons-solid/CheckCircle";
import {TimesCircle} from "@styled-icons/fa-regular/TimesCircle";
import {TimeFive} from "@styled-icons/boxicons-solid/TimeFive";

const AddressLine = props => {
  return (
    <Box {...props}>
      <Text color="navys.1">{props.children}</Text>
    </Box>
  );
};

const Customer = ({props}) => {
  const {purchase} = props;
  console.log(purchase);
  const {address} = purchase.recipient;
  return (
    <Box pt={2} pb={2}>
      <Text color="navys.0" mb={1}>
        {purchase.recipient.name}
      </Text>
      <AddressLine>{address.line1}</AddressLine>
      <AddressLine>{address.line2}</AddressLine>
      <AddressLine>
        {address.city}, {address.state} {address.zip}
      </AddressLine>
    </Box>
  );
};

const PaymentStatus = ({props}) => {
  const {purchase} = props;
  let color = "yellows.0";
  let displayIcon = (
    <Icon mr={2} color={"greens.4"} h={"2.5rem"}>
      <TimeFive />
    </Icon>
  );
  if (purchase.paymentStatus === "Successful") {
    color = "greens.4";
    displayIcon = (
      <Icon mr={2} color={"greens.4"} h={"2.5rem"}>
        <CheckCircle />
      </Icon>
    );
  } else if (purchase.paymentStatus === "Failed") {
    color = "reds.1";
    displayIcon = (
      <Icon mr={2} color={"greens.4"} h={"2.5rem"}>
        <TimesCircle />
      </Icon>
    );
  }
  return (
    <Flex pt={2} pb={2} color={color} alignItems="center">
      {displayIcon}
      <Text color="navys.1">{purchase.paymentStatus}</Text>
    </Flex>
  );
};

const Order = ({props}) => {
  // const {purchase} = props;
  return (
    <Flex pt={2} pb={2} flexDirection="column">
      <Text color="navys.0">Demo box:</Text>
      <Text color="navys.0" ml={2}>
        Hair filling fibers
      </Text>
      <Text color="navys.0" ml={2}>
        Hair filling fibers starter kit
      </Text>
      <Text color="navys.0" ml={2}>
        Applicator
      </Text>
    </Flex>
  );
};

// const ExpandedOrder = ({props}) => {
//   return <Flex alignItems="center">Ordered:</Flex>;
// };

const columns = [
  {
    name: "Order",
    selector: "order",
    sortable: true,
    maxWidth: "25rem",
    width: "25rem",
    cell: purchase => <Order props={purchase} />
  },
  {
    name: "Customer",
    selector: "customer",
    sortable: true,
    maxWidth: "25rem",
    width: "25rem",
    cell: purchase => <Customer props={purchase} />
  },
  {
    name: "Payment Status",
    selector: "paymentStatus",
    sortable: true,
    maxWidth: "15rem",
    width: "15rem",
    cell: purchase => <PaymentStatus props={purchase} />
  }
];

const _PurchaseTable = props => {
  const {currentAccountUser} = props;
  return (
    <Box
      w={r("80rem --------> 100rem")}
      maxWidth="100%"
      boxShadow="0 1px 6px rgba(57,73,76,0.35)"
      bg={"whites.0"}
      br={"4px"}
      {...props}
    >
      <FormSection>
        <Text fs="1.8rem" fw={500}>
          {props.title}
        </Text>
      </FormSection>

      <FormSection h="auto" bg={"blues.3"} flexDirection="column" pt={4} pb={4}>
        {currentAccountUser && (
          <Query
            query={SALES}
            pollInterval={500}
            variables={{
              token: getToken().token,
              accountUserId: parseInt(currentAccountUser)
            }}
          >
            {({loading, error, data}) => {
              if (loading)
                return (
                  <Box h="3.5rem" mb={4}>
                    <Text>Loading...</Text>
                  </Box>
                );
              if (error)
                return (
                  <Box h="3.5rem" mb={4}>
                    <Text>Error! {error.message}</Text>
                  </Box>
                );
              console.log(data.sales);
              return (
                <DataTable
                  noHeader
                  allowOverflow
                  columns={columns}
                  data={data.sales}
                  // expandableRows
                  // expandableRowsComponent={<ExpandedOrder />}
                />
              );
            }}
          </Query>
        )}
      </FormSection>

      <FormSection justifyContent="flex-end"></FormSection>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

const PurchaseTable = connect(
  mapStateToProps,
  null
)(_PurchaseTable);

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <PurchaseTable title={"Purchases"} />
    </Flex>
  );
};
