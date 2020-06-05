import React from "react";
import {Flex, Image, Text, Box, CallToActionButton} from "components";
import {responsive as r, getToken} from "lib";
import bromane from "assets/images/bromane-brand.jpg";
import {Card} from "views/Dashboard/Components";
import {Query} from "@apollo/react-components";
import {connect} from "react-redux";

import {ACCOUNT_USER__PRODUCTS} from "./gql";

const ImageCard = props => {
  return (
    <Card
      p={3}
      maxWidth={r(
        "26rem 28rem 30rem 33rem  22rem 24rem 30rem 34rem 24rem 30rem 27rem"
      )}
      mr={1}
      ml={1}
      mt={3}
      mb={3}
      bg={"whites.0"}
      br={"3px"}
      {...props}
    >
      <Image mt="auto" mb={2} w={"100%"} src={bromane} />
      <Text
        mt="auto"
        letterSpacing="0.5px"
        color={"navys.0"}
        mb={2}
        fw={600}
        w={"100%"}
      >
        {props.title}
      </Text>
      <Text letterSpacing="0.5px" color={"navys.0"} mb={2} fw={300} w={"100%"}>
        {props.description}
      </Text>
      <CallToActionButton
        hoverBackground="#FFC651"
        br={2}
        mt={2}
        bg={"yellows.1"}
        w="100%"
      >
        Create a demo box
      </CallToActionButton>
    </Card>
  );
};

function _Products(props) {
  const {currentAccountUser} = props;
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          My products
        </Text>
      </Flex>

      <Query
        query={ACCOUNT_USER__PRODUCTS}
        variables={{
          token: getToken().token,
          id: parseInt(currentAccountUser)
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
          console.log(data.accountUser.account.products);
          const {products} = data.accountUser.account;
          return (
            <Flex
              boxShadow={0}
              br={2}
              bg="whites.0"
              w={r("80rem ---------> 100rem")}
              maxWidth="100%"
              flexWrap={"wrap"}
              mb={4}
              p={r("0 --> 3 -----> 4")}
              justifyContent={"center"}
            >
              {products &&
                products.map((product, index) => (
                  <ImageCard
                    key={index}
                    title={product.name}
                    description={product.description}
                  />
                ))}
            </Flex>
          );
        }}
      </Query>
    </>
  );
}
const mapStateToProps = state => {
  return {
    currentAccountUser: state.dashboard.currentAccountUser
  };
};

export default connect(
  mapStateToProps,
  null
)(_Products);
