import React from "react";
import {Box, Flex, Text, DropDown} from "components";
import {
  FlexInput,
  FlexField,
  FormSection,
  FormGroup
} from "views/Dashboard/Components";
// import {Query} from "@apollo/react-components";

import {responsive as r} from "lib";

// const DemoBoxesDropDown = props => {
//   const {currentAccountUser} = props;
//   return (
//     <Query
//       query={ACCOUNT_USER__PRODUCTS}
//       variables={{
//         token: getToken().token,
//         id: parseInt(currentAccountUser)
//       }}
//     >
//       {({loading, error, data}) => {
//         if (loading)
//           return (
//             <Flex alignItems="center" h="3.5rem">
//               <Text>Loading...</Text>
//             </Flex>
//           );
//         if (error)
//           return (
//             <Flex alignItems="center" h="3.5rem">
//               <Text>Error! {error.message}</Text>
//             </Flex>
//           );
//         const {products} = data.accountUser.account;
//         return (
//           <Flex flexBasis="60%">
//             <DropDown
//               options={products.map(product => {
//                 return {text: product.name, value: product.id};
//               })}
//               br={2}
//               maxWidth="100%"
//               w="25rem"
//               border={"1px solid lightslategrey"}
//               {...props}
//             />
//           </Flex>
//         );
//       }}
//     </Query>
//   );
// };

const DemoBoxFormCard = props => {
  return (
    <Box
      w={r("80rem ---------> 100rem")}
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

      <FormSection bg={"blues.3"} flexDirection="column" pt={4} pb={4}>
        <FormGroup>
          <FlexField name={"Account name:"} />
          <FlexInput mt={1} />
        </FormGroup>
        <FormGroup mt={3} mb={r("3 ----> 2")}>
          <FlexField name={"Address:"} />
          <Flex flexBasis="60%" flexDirection="column" mt={2}>
            <FlexInput placeholder="Address line 1" mb={1} />
            <FlexInput placeholder="Address line 2" mb={1} />
            <FlexInput placeholder="City" mb={1} />
            <Flex mb={2}>
              <DropDown
                br={2}
                maxWidth="100%"
                w="25rem"
                border={"1px solid lightslategrey"}
                bg="whites.0"
                onChange={e => console.log(e.target.value)}
                options={[{text: "test", value: "testval"}]}
                defaultValue={"OH"}
              />
            </Flex>
            <FlexInput placeholder="ZIP" />
          </Flex>
        </FormGroup>
      </FormSection>

      <FormSection justifyContent="flex-end">
        <Text fs="1.6rem" fw={500}>
          Save
        </Text>
      </FormSection>
    </Box>
  );
};

export default function ProfileForm(props) {
  return (
    <Flex mb={4} justifyContent="center">
      <DemoBoxFormCard title={"Create a demo campaign"} />
    </Flex>
  );
}
