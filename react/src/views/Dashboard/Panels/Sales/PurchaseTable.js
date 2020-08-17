import React, {useState, useEffect} from "react";
import {Box, Flex, Text, Icon} from "components";
import {FormSection, FlexInput, FormButton} from "views/Dashboard/Components";
import {responsive as r, getToken} from "lib";
import {connect} from "react-redux";
import DataTable from "react-data-table-component";
import {Query, Mutation} from "@apollo/react-components";
import {SALES, UPDATE_PURCHASE_TRACKING} from "views/Dashboard/gql";
// import DemodashIcon from "assets/icons/demodash";
import {Truck} from "@styled-icons/boxicons-solid/Truck";
import {Lock} from "@styled-icons/boxicons-solid/Lock";
import {LockOpen} from "@styled-icons/boxicons-solid/LockOpen";

import {CheckCircle} from "@styled-icons/boxicons-solid/CheckCircle";
import {TimesCircle} from "@styled-icons/fa-regular/TimesCircle";
import {TimeFive} from "@styled-icons/boxicons-solid/TimeFive";
import Moment from "react-moment";

const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

const Date = ({props}) => {
  const {purchase} = props;
  return (
    <Flex flexDirection="column" pt={2} pb={2}>
      <Text fw={500} color="navys.0">
        <Moment format="MMMM DD YYYY">{purchase.dateCreated}</Moment>
      </Text>
      <Text fw={300} color="navys.1">
        <Moment format="hh:mm A">{purchase.dateCreated}</Moment>
      </Text>
    </Flex>
  );
};
const AddressLine = props => {
  return (
    <Box {...props}>
      <Text color="navys.0">{props.children}</Text>
    </Box>
  );
};

const Customer = ({props}) => {
  const {purchase} = props;
  const {address} = purchase.recipient;
  return (
    <Box pt={2} pb={2}>
      <Text color="navys.0" mb={1}>
        {purchase.recipient.name}
      </Text>
      <AddressLine>{address.line1}</AddressLine>
      {address.line2 && <AddressLine>{address.line2}</AddressLine>}
      <AddressLine>
        {address.city}, {address.state} {address.zip}
      </AddressLine>
    </Box>
  );
};

const PaymentStatus = props => {
  const {purchase} = props;
  let color = "oranges.0";
  let paymentStatus = "Pending";
  let displayIcon = (
    <Icon mr={2} color={color} h={"2.5rem"}>
      <TimeFive />
    </Icon>
  );
  if (purchase.paymentStatus === "Successful") {
    color = "greens.4";
    paymentStatus = "Paid";
    displayIcon = (
      <Icon mr={2} color={color} h={"2.5rem"}>
        <CheckCircle />
      </Icon>
    );
  } else if (purchase.paymentStatus === "Failed") {
    color = "reds.1";
    paymentStatus = "Failed";
    displayIcon = (
      <Icon mr={2} color={color} h={"2.5rem"}>
        <TimesCircle />
      </Icon>
    );
  }
  return (
    <Flex color={color} alignItems="center" {...props}>
      {displayIcon}
      <Text color={color}>{paymentStatus}</Text>
    </Flex>
  );
};

const ShippingStatus = props => {
  const {purchase} = props;
  const {receipt} = purchase;
  let color = "oranges.0";
  let shippingStatus = "Shipping needed";
  let displayIcon = (
    <Icon mr={2} color={color} h={"2.5rem"}>
      <TimeFive />
    </Icon>
  );
  if (receipt.wasShipped) {
    color = "greens.4";
    shippingStatus = "Shipped";
    displayIcon = (
      <Icon mr={2} color={color} h={"2.5rem"}>
        <CheckCircle />
      </Icon>
    );
  }
  return (
    <Flex color={color} alignItems="center" {...props}>
      {displayIcon}
      <Text color={color}>{shippingStatus}</Text>
    </Flex>
  );
};

const Status = ({props}) => {
  const {purchase} = props;
  const wasPaid = purchase.paymentStatus === "Successful";
  return (
    <Flex flexDirection="column" pt={2} pb={2}>
      <PaymentStatus mb={wasPaid ? 2 : 0} purchase={purchase} />
      {wasPaid && <ShippingStatus purchase={purchase} />}
    </Flex>
  );
};

const Order = ({props}) => {
  const {purchase} = props;
  const {items} = purchase.receipt;
  let displayItems = [];
  for (let key in items) {
    let item = items[key];
    if (item.demoBox) {
      for (let i in item.demoBox.items) {
        let demoBoxItem = item.demoBox.items[i];
        displayItems.push(demoBoxItem.product.name);
      }
    } else {
      displayItems.push(item.product.name);
    }
  }
  let uid = purchase.receipt.uid.split("-");
  return (
    <Flex pt={2} pb={2} flexDirection="column">
      <Text mb={1}>
        #{uid[0]}-{uid[3]}
      </Text>
      <Text mb={1} color="navys.0">
        Demo box:
      </Text>
      {displayItems.map(function(item, i) {
        return (
          <Text key={i} color="navys.0" ml={2}>
            {item}
          </Text>
        );
      })}
    </Flex>
  );
};

const Payout = ({props}) => {
  const {purchase} = props;
  const {items} = purchase.receipt;
  let commissionTotal = 0;
  for (let key in items) {
    let item = items[key];
    if (item.commission) commissionTotal += item.commission.amount;
  }
  let feeTotal = 0;
  let payout = 0;
  let transfer = 0;
  if (purchase.receipt.transfers.length) {
    transfer = purchase.receipt.transfers[0];
    feeTotal = transfer.demodashFee + transfer.stripeFee;
    payout = transfer.amount - feeTotal - commissionTotal;
  }

  return (
    <Flex pt={2} pb={2} flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Text mr={1} color="navys.0">
          Price:
        </Text>
        <Flex flexGrow={0}>
          <Text color="navys.0">$</Text>
          <Text color="navys.0" ml={1}>
            {purchase.total.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      <Flex mt={1} justifyContent="space-between" alignItems="center">
        <Text mr={1} color="navys.0">
          Fees:
        </Text>
        <Flex flexGrow={0}>
          <Text color="navys.0">- $</Text>
          <Text color="navys.0" ml={1}>
            {feeTotal.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      <Flex
        borderBottom={"1px solid #dae0e6"}
        mt={1}
        pb={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text mr={1} color="navys.0">
          Commission:
        </Text>
        <Flex flexGrow={0}>
          <Text color="darkBlues.0">- $</Text>
          <Text color="darkBlues.0" ml={1}>
            {commissionTotal.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      <Flex mt={1} justifyContent="space-between" alignItems="center">
        <Text mr={1} color="navys.0">
          Net payout:
        </Text>
        <Flex flexGrow={0}>
          <Text color="greens.4">$</Text>
          <Text color="greens.4" ml={1}>
            {payout.toFixed(2)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

function format(s) {
  return s.toString().replace(/\w{4}(?=.)/g, "$& ");
}

const _MutationButton = props => {
  const accountUserId = parseInt(props.currentAccountUser);
  return (
    <Mutation
      mutation={UPDATE_PURCHASE_TRACKING}
      refetchQueries={[
        {
          query: SALES,
          variables: {
            token: getToken().token,
            accountUserId: accountUserId
          }
        }
      ]}
    >
      {updatePurchaseTracking => (
        <FormButton
          mt={1}
          disabled={props.disabled}
          cursor={props.disabled ? "no-drop" : "pointer"}
          hoverBackground={props.disabled ? "yellows.1" : "#FFC651"}
          w="100%"
          maxWidth={"100%"}
          title="Shipped"
          onClick={() => {
            updatePurchaseTracking({
              variables: {
                accountUserId: accountUserId,
                ...props.mutationVariables
              }
            });
          }}
        >
          <Flex justifyContent="center" alignItems="center">
            <Icon color="blacks.0" h="2rem" ml={2} mr={1}>
              <Truck />
            </Icon>
            <Text color="blacks.0" mr={3} ml={2}>
              Update shipping
            </Text>
          </Flex>
        </FormButton>
      )}
    </Mutation>
  );
};

const MutationButton = connect(
  mapStateToProps,
  null
)(_MutationButton);

const ShippingInfo = ({props}) => {
  const {purchase} = props;
  const initialTracking = purchase.receipt.trackingNumber || "";
  const [trackingNumber, setTrackingNum] = useState(initialTracking);
  const [edit, toggleEdit] = useState(initialTracking ? false : true);

  const disabled =
    purchase.receipt.trackingNumber === trackingNumber ||
    trackingNumber === 0 ||
    trackingNumber === "";

  useEffect(() => {
    setTrackingNum(purchase.receipt.trackingNumber);
    toggleEdit(false);
  }, [purchase.receipt.trackingNumber]);

  let hasTrackingNumber = true;
  if (trackingNumber === 0 || trackingNumber === "" || trackingNumber === null)
    hasTrackingNumber = false;

  return (
    <Flex
      mt={!edit ? 3 : 0}
      mb={!edit ? 3 : 0}
      pt={2}
      pb={2}
      flexDirection="column"
      maxWidth="100%"
    >
      <Flex justifyContent="space-between">
        <Text color="navys.0">Tracking number:</Text>
        {purchase.receipt.wasShipped && edit && (
          <Icon
            cursor="pointer"
            onClick={() => {
              toggleEdit(!edit);
            }}
            mr={1}
            color="oranges.0"
            h="1.5rem"
          >
            <LockOpen />
          </Icon>
        )}
        {purchase.receipt.wasShipped && !edit && (
          <Icon
            cursor="pointer"
            onClick={() => {
              toggleEdit(!edit);
            }}
            mr={1}
            color="oranges.0"
            h="1.5rem"
          >
            <Lock />
          </Icon>
        )}
      </Flex>
      <FlexInput
        disabled={purchase.receipt.wasShipped && !edit}
        cursor={purchase.receipt.wasShipped && !edit ? "text" : "default"}
        mt={1}
        mb={1}
        inputProps={{fontSize: "1.4rem", mt: 0, mb: 0}}
        value={trackingNumber}
        maxWidth={"100%"}
        onChange={evt => {
          setTrackingNum(evt.target.value);
        }}
      />
      {hasTrackingNumber && (
        <Text color="navys.1" fs="1.1rem">
          {format(trackingNumber)}
        </Text>
      )}
      {(!purchase.receipt.wasShipped || edit) && (
        <MutationButton
          disabled={disabled}
          mutationVariables={{
            token: getToken().token,
            purchaseId: parseInt(purchase.id),
            trackingNumber: trackingNumber
          }}
        />
      )}
    </Flex>
  );
};

const columns = [
  {
    name: "Purchase date",
    selector: "purchase.dateCreated",
    sortable: true,
    maxWidth: "18rem",
    width: "18rem",
    cell: purchase => <Date props={purchase} />
  },
  {
    name: "Customer",
    selector: "purchase.recipient.name",
    sortable: true,
    maxWidth: "20rem",
    width: "20rem",
    cell: purchase => <Customer props={purchase} />
  },
  {
    name: "Order",
    selector: "purchase.receipt.uid",
    sortable: true,
    maxWidth: "20rem",
    width: "20rem",
    cell: purchase => <Order props={purchase} />
  },
  {
    name: "Payout",
    selector: "payout",
    maxWidth: "20rem",
    width: "20rem",
    cell: purchase => <Payout props={purchase} />
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    maxWidth: "18rem",
    width: "18rem",
    cell: purchase => <Status props={purchase} />
  },
  {
    name: "Shipping",
    selector: "shipping",
    sortable: false,
    maxWidth: "20rem",
    width: "20rem",
    cell: purchase => <ShippingInfo props={purchase} />
  }
];

const _PurchaseTable = props => {
  const {currentAccountUser} = props;
  return (
    <Box
      w={r("120rem")}
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
            // pollInterval={1000}
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
                  currentAccountUser={parseInt(currentAccountUser)}
                  data={data.sales}
                  noDataComponent={
                    <Box p={4}>
                      <Text>No records yet</Text>
                    </Box>
                  }
                />
              );
            }}
          </Query>
        )}
      </FormSection>
    </Box>
  );
};

const PurchaseTable = connect(
  mapStateToProps,
  null
)(_PurchaseTable);

export default props => {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Real-time sales
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <PurchaseTable title={"Sales"} />
      </Flex>
    </>
  );
};
