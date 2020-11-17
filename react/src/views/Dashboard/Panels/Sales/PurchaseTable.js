import React, {useState, useEffect} from "react";
import {Box, Flex, Text, Icon} from "components";
import {FormSection, FlexInput, FormButton} from "views/Dashboard/Components";

import {responsive as r, getToken} from "lib";
import {connect} from "react-redux";
import DataTable from "react-data-table-component";
import {Query, Mutation} from "@apollo/react-components";
import {SALES, UPDATE_PURCHASE_TRACKING} from "views/Dashboard/gql";
import {Truck} from "@styled-icons/boxicons-solid/Truck";
import {Lock} from "@styled-icons/boxicons-solid/Lock";
import {LockOpen} from "@styled-icons/boxicons-solid/LockOpen";
import {CheckCircle} from "@styled-icons/boxicons-solid/CheckCircle";
import {TimesCircle} from "@styled-icons/fa-regular/TimesCircle";
import {TimeFive} from "@styled-icons/boxicons-solid/TimeFive";
import Moment from "react-moment";

const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser,
    panel: state.panel,
    accountType: state.profileForm.type
  };
};

const Date = ({props}) => {
  return (
    <Flex flexDirection="column" pt={2} pb={2}>
      <Text fw={500} color="navys.0">
        <Moment format="MMMM DD YYYY">{props.dateCreated}</Moment>
      </Text>
      <Text fw={300} color="navys.1">
        <Moment format="hh:mm A">{props.dateCreated}</Moment>
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
  const {recipient} = props;
  const {address} = props.recipient;
  return (
    <Box pt={2} pb={2}>
      <Text color="navys.0" mb={1}>
        {recipient.name}
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
  let color = "oranges.0";
  let paymentStatus = "Payment Pending";
  let displayIcon = (
    <Icon mr={2} color={color} h={"2.5rem"}>
      <TimeFive />
    </Icon>
  );
  if (props.paymentStatus === "Successful") {
    color = "greens.4";
    paymentStatus = "Payment Successful";
    displayIcon = (
      <Icon mr={2} color={color} h={"2.5rem"}>
        <CheckCircle />
      </Icon>
    );
  } else if (props.paymentStatus === "Failed") {
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
  const {wasShipped, isBrand} = props;
  let color = "oranges.0";
  let shippingStatus = "Not yet shipped";
  if (isBrand) shippingStatus = "Shipping needed";
  let displayIcon = (
    <Icon mr={2} color={color} h={"2.5rem"}>
      <TimeFive />
    </Icon>
  );
  if (wasShipped) {
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
  const {paymentStatus, order, isBrand} = props;
  const wasPaid = paymentStatus === "Successful";
  return (
    <Flex flexDirection="column" pt={2} pb={2}>
      <PaymentStatus mt={1} mb={1} paymentStatus={paymentStatus} />
      {wasPaid &&
        order.receipts.map(function(receipt, index) {
          const {wasShipped, trackingNumber} = receipt;
          let hasTrackingNumber = true;
          if (
            trackingNumber === 0 ||
            trackingNumber === "" ||
            trackingNumber === null
          )
            hasTrackingNumber = false;
          return (
            <Flex key={index} mb={2} flexDirection="column">
              {!isBrand && (
                <Text mb={1} key={`${index}`} color="navys.2">
                  {receipt.sellerAccount.profile.name}
                </Text>
              )}
              {<ShippingStatus isBrand={isBrand} wasShipped={wasShipped} />}
              {hasTrackingNumber && !isBrand && (
                <Text ml={2} mt={1} color="navys.1" fs={"1.2rem"}>
                  tracking #: {format(receipt.trackingNumber)}
                </Text>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
};

const Order = ({props}) => {
  const {order, isBrand} = props;
  let orderType = "Demo box";
  let brandItems = [];
  for (let key in order.receipts) {
    let receipt = order.receipts[key];
    let brand = receipt.sellerAccount.profile.name;
    let items = [];
    for (let itemIndex in order.receipts[key].items) {
      let item = receipt.items[itemIndex];
      if (item.demoBox) {
        for (let i in item.demoBox.items) {
          let demoBoxItem = item.demoBox.items[i];
          items.push({
            name: demoBoxItem.product.name,
            quantity: null,
            brand: brand
          });
        }
      } else {
        orderType = "Purchase";
        items.push({
          name: item.product.name,
          quantity: item.quantity,
          options: item.options,
          brand: brand
        });
      }
    }
    brandItems.push({brand, items});
  }
  return (
    <Flex pt={2} pb={2} flexDirection="column">
      <Text mb={1}>#{order.uid}</Text>
      {isBrand && (
        <Text mb={1} color="navys.0">
          {orderType}:
        </Text>
      )}
      {brandItems.map(function(receipt, index) {
        return (
          <Flex key={index} flexDirection="column">
            {!isBrand && (
              <Text color="navys.2" ml={2} mb={1}>
                {receipt.brand}
              </Text>
            )}
            {receipt.items.map(function(item, i) {
              return (
                <Flex
                  borderBottom={
                    i < receipt.items.length - 1 ? "1px solid #dae0e6" : ""
                  }
                  marginBottom={i < receipt.items.length - 1 ? 1 : 0}
                  key={i}
                  flexDirection="column"
                >
                  <Text color="navys.0" ml={2} mb={1}>
                    - {item.name}{" "}
                    {item.quantity && <>&#10005; {item.quantity}</>}
                  </Text>
                  {item.options && item.options.length ? (
                    <Flex ml={2} mb={1}>
                      {item.options.map(function(option, index) {
                        return (
                          <Text
                            key={`o_${i}_${index}`}
                            color="navys.1"
                            fs={"1.2rem"}
                            ml={2}
                            w={"fit-content"}
                          >
                            {option.variationOptionName}
                            {index < item.options.length - 1 && ", "}
                          </Text>
                        );
                      })}
                    </Flex>
                  ) : (
                    ""
                  )}
                </Flex>
              );
            })}
          </Flex>
        );
      })}
    </Flex>
  );
};

const Payout = ({props}) => {
  const {isBrand, payout} = props;
  const {total, fees, commission} = payout;
  let netAmount = total - (fees + commission);
  if (!isBrand) netAmount = commission - fees;
  return (
    <Flex pt={2} pb={2} flexDirection="column">
      <Flex pb={!isBrand ? 1 : 0} justifyContent="space-between">
        <Text mr={1} color="navys.0">
          Purchase total:
        </Text>
        <Flex flexGrow={0}>
          <Text color="navys.0">$</Text>
          <Text color="navys.0" ml={1}>
            {total.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      {isBrand && (
        <Flex mt={1} justifyContent="space-between" alignItems="center">
          <Text mr={1} color="navys.0">
            Fees:
          </Text>
          <Flex flexGrow={0}>
            <Text color="navys.0">- $</Text>
            <Text color="navys.0" ml={1}>
              {fees.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      )}

      <Flex
        borderBottom={isBrand ? "1px solid #dae0e6" : ""}
        pt={1}
        pb={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text mr={1} color="navys.0">
          Commission:
        </Text>
        <Flex flexGrow={0}>
          {isBrand && <Text color="darkBlues.0">- $</Text>}
          <Text color={isBrand ? "darkBlues.0" : "greens.4"} ml={1}>
            {commission.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      {!isBrand && (
        <Flex
          borderBottom={"1px solid #dae0e6"}
          pt={1}
          pb={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text mr={1} color="navys.0">
            Fees:
          </Text>
          <Flex flexGrow={0}>
            <Text color="navys.0">- $</Text>
            <Text color="navys.0" ml={1}>
              {fees.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      )}

      <Flex mt={1} justifyContent="space-between" alignItems="center">
        <Text mr={1} color="navys.0">
          Net payout:
        </Text>
        <Flex flexGrow={0}>
          <Text color="greens.4">$</Text>
          <Text color="greens.4" ml={1}>
            {netAmount.toFixed(2)}
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
  const {order, isBrand} = props;
  const receipt = order.receipts[0];
  const initialTracking = receipt.trackingNumber || "";
  const [trackingNumber, setTrackingNum] = useState(initialTracking);
  const [edit, toggleEdit] = useState(initialTracking ? false : true);

  const disabled =
    receipt.trackingNumber === trackingNumber ||
    trackingNumber === 0 ||
    trackingNumber === "";

  useEffect(() => {
    setTrackingNum(receipt.trackingNumber);
    toggleEdit(false);
  }, [receipt.trackingNumber]);

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
        {receipt.wasShipped && edit && (
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
        {receipt.wasShipped && !edit && isBrand && (
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
      {isBrand && (
        <FlexInput
          disabled={(receipt.wasShipped && !edit) || !isBrand}
          cursor={receipt.wasShipped && !edit ? "text" : "default"}
          mt={1}
          mb={1}
          inputProps={{fontSize: "1.6rem", mt: 0, mb: 0}}
          value={trackingNumber || ""}
          maxWidth={"100%"}
          onChange={evt => {
            setTrackingNum(evt.target.value);
          }}
        />
      )}
      <Text
        mt={!isBrand ? 2 : 0}
        color="navys.1"
        fs={!isBrand ? "1.2rem" : "1.1rem"}
      >
        {hasTrackingNumber
          ? format(trackingNumber)
          : "No tracking number yet..."}
      </Text>
      {((!receipt.wasShipped && isBrand) || edit) && (
        <MutationButton
          disabled={disabled}
          mutationVariables={{
            token: getToken().token,
            receiptId: parseInt(receipt.id),
            trackingNumber: trackingNumber
          }}
        />
      )}
    </Flex>
  );
};

function _PurchaseTable(props) {
  const {currentAccountUser, panel, accountType} = props;
  const isBrand = accountType === "Brand";
  let columns = [
    {
      name: "Purchase date",
      selector: "dateCreated",
      sortable: true,
      maxWidth: "18rem",
      width: "18rem",
      cell: props => <Date props={props} />
    },
    {
      name: "Customer",
      selector: "recipient.name",
      sortable: true,
      maxWidth: "20rem",
      width: "20rem",
      cell: props => <Customer props={props} />
    },
    {
      name: "Order",
      selector: "purchase.receipts[0].uid",
      sortable: true,
      maxWidth: "20rem",
      width: "20rem",
      cell: purchase => <Order props={{isBrand, ...purchase}} />
    },

    {
      name: "Payout",
      selector: "payout",
      maxWidth: "20rem",
      width: "20rem",
      cell: purchase => <Payout props={{isBrand, ...purchase}} />
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      maxWidth: "20rem",
      width: "20rem",
      cell: purchase => <Status props={{isBrand, ...purchase}} />
    }
  ];
  if (isBrand)
    columns.push({
      name: "Shipping",
      selector: "shipping",
      sortable: false,
      maxWidth: "20rem",
      width: "20rem",
      cell: purchase => <ShippingInfo props={{isBrand, ...purchase}} />
    });
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
        {currentAccountUser && panel === "sales" && (
          <Query
            query={SALES}
            pollInterval={3000} //Every 3 seconds
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
              let queryData = data.sales;
              return (
                <DataTable
                  noHeader
                  allowOverflow
                  columns={columns}
                  currentAccountUser={parseInt(currentAccountUser)}
                  data={queryData}
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
}

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
