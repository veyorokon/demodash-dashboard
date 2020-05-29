import React from "react";
import {Box, Flex, Text, Table, Tr, Th, Td} from "components";
import {FormSection} from "./Components";
import {responsive as r} from "lib";
import styled from "styled-components";

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

      <FormSection bg={"blues.3"} flexDirection="column" pt={4}>
        <TableWrapper pb={2} mb={2}>
          <Table w="100%" minWidth="75rem">
            <Tr textAlign="left">
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Variations</Th>
              <Th />
            </Tr>
            <Tr>
              <Td pt={2} pb={2}>
                <Text>Hair filling fibers</Text>
              </Td>
              <Td pt={2} pb={2}>
                <Text>
                  Hair filling fibers that add density to thinning hair
                </Text>
              </Td>
              <Td pt={2} pb={2}>
                <Text>bromane.jpg</Text>
              </Td>
              <Td pt={2} pb={2}>
                <Text>Dark Brown</Text>
                <Text>Med Brown</Text>
                <Text>Light Brown</Text>
                <Text>Black</Text>
              </Td>
              <Td pt={2} pb={2} minWidth={"5rem"}>
                <Text m={"auto"} textAlign="center">
                  Edit
                </Text>
              </Td>
            </Tr>
          </Table>
        </TableWrapper>
        <Text>Add</Text>
      </FormSection>

      <FormSection justifyContent="flex-end">
        <Text fs="1.6rem" fw={500}>
          Save
        </Text>
      </FormSection>
    </Box>
  );
};

export default props => {
  return (
    <Flex mb={4} justifyContent="center">
      <ProductForm title={"Products"} />
    </Flex>
  );
};
