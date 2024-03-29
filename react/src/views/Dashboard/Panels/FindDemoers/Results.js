import React from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Td as TdCore,
  TableWrapper
} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r} from "lib";

const Td = props => {
  return (
    <TdCore pt={4} pb={4} {...props}>
      {props.children}
    </TdCore>
  );
};

const ProductForm = props => {
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

      <FormSection bg={"blues.3"} flexDirection="column" pt={4} pb={4}>
        <TableWrapper mb={3} pb={3}>
          <Table w="100%" minWidth="75rem">
            <tbody>
              <Tr textAlign="left">
                <Th pb={2}>Name</Th>
                <Th pb={2}>Location</Th>
                <Th pb={2}>Sales vol</Th>
                <Th pb={2}>Campaigns</Th>
                <Th pb={2}>Invite</Th>
                <Th />
              </Tr>
              <Tr bg={"whites.0"}>
                <Td>
                  <Text ml={2}>Cherry's barbershop</Text>
                </Td>
                <Td>
                  <Text ml={2}>Ohio</Text>
                </Td>
                <Td>
                  <Text ml={2}>$1,200</Text>
                </Td>
                <Td>
                  <Text ml={2}>bromane campaign</Text>
                </Td>
                <Td minWidth={"5rem"}>
                  <Text m={"auto"} textAlign="center">
                    Send invite
                  </Text>
                </Td>
              </Tr>
            </tbody>
          </Table>
        </TableWrapper>
      </FormSection>

      <FormSection justifyContent="flex-end"></FormSection>
    </Box>
  );
};

const Results = props => {
  return (
    <Flex mb={4} justifyContent="center">
      <ProductForm title={"Demoers"} />
    </Flex>
  );
};
export default Results;
