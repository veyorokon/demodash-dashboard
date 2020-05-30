import React from "react";
import {Box, Flex, Text, Table, Tr, Th, Td as TdCore, Button} from "components";
import {FormSection} from "views/Dashboard/Components";
import {responsive as r} from "lib";
import styled from "styled-components";

export const CallToActionButton = styled(Button)`
  height: ${props =>
    props.height ? props.height : props.h ? props.h : "3.5rem"};
  cursor: pointer;
  min-width: fit-content;
  border: none;
  outline: none;
  letter-spacing: 0.2px;
  transition: all 0.3s ease-in-out;
`;

const TableWrapper = styled(Box)`
  overflow-x: scroll;
  width: 100%;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const Td = props => {
  return (
    <TdCore pt={4} pb={4} {...props}>
      {props.children}
    </TdCore>
  );
};

const PurchaseTable = props => {
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
            <Tr textAlign="left">
              <Th pb={2}>Name</Th>
              <Th pb={2}>Address</Th>
              <Th pb={2}>Product</Th>
              <Th pb={2}>Referrer</Th>
              <Th pb={2}>Tracking No.</Th>
              <Th />
            </Tr>
            <Tr bg={"whites.0"}>
              <Td>
                <Text ml={2}>John Doe</Text>
              </Td>
              <Td>
                <Text ml={2}>8412 Paul Drive</Text>
                <Text ml={2}>West Chester, OH</Text>
                <Text ml={2}>45069</Text>
              </Td>
              <Td>
                <Text ml={2}>Bromane - Starter kit</Text>
                <Text ml={2}>Dark Brown</Text>
              </Td>
              <Td>
                <Text ml={2}>Cherry's Barbershop</Text>
              </Td>
              <Td>
                <Text ml={2}>1Z 999 AA1 01 2345 6784</Text>
              </Td>
              <Td minWidth={"5rem"}>
                <Text m={"auto"} textAlign="center">
                  Refund
                </Text>
              </Td>
              <Td minWidth={"5rem"}>
                <Text m={"auto"} textAlign="center">
                  Save
                </Text>
              </Td>
            </Tr>
          </Table>
        </TableWrapper>
      </FormSection>

      <FormSection justifyContent="flex-end"></FormSection>
    </Box>
  );
};

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <PurchaseTable title={"Products"} />
    </Flex>
  );
};
