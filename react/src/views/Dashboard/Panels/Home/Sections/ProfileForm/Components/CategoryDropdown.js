import {Box, Text, Flex, DropDown} from "components";
import {Query} from "@apollo/react-components";
import {ACCOUNT_CATEGORIES} from "views/Dashboard/gql";

const CategoryDropDown = props => {
  return (
    <Query query={ACCOUNT_CATEGORIES}>
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
        const options = data.industries;
        return (
          <Flex>
            <DropDown
              options={options}
              br={2}
              maxWidth="100%"
              w="25rem"
              border={"1px solid lightslategrey"}
              hiddenOption={"Select your industry"}
              {...props}
            />
          </Flex>
        );
      }}
    </Query>
  );
};

export default CategoryDropDown;
