import React from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Tr,
  Th,
  Td as TdCore,
  CallToActionButton,
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
                <Th pb={2}>Description</Th>
                <Th pb={2}>Image</Th>
                <Th pb={2}>Variations</Th>
                <Th />
              </Tr>
              <Tr bg={"whites.0"}>
                <Td>
                  <Text ml={2}>Hair filling fibers</Text>
                </Td>
                <Td>
                  <Text ml={2}>
                    Hair filling fibers that add density to thinning hair
                  </Text>
                </Td>
                <Td>
                  <Text ml={2}>bromane.jpg</Text>
                </Td>
                <Td>
                  <Text ml={2}>Dark Brown</Text>
                  <Text ml={2}>Med Brown</Text>
                  <Text ml={2}>Light Brown</Text>
                  <Text ml={2}>Black</Text>
                </Td>
                <Td minWidth={"5rem"}>
                  <Text m={"auto"} textAlign="center">
                    Edit
                  </Text>
                </Td>
              </Tr>
            </tbody>
          </Table>
        </TableWrapper>
        <CallToActionButton
          hoverBackground="#FFC651"
          br={2}
          mt={1}
          mb={2}
          ml="auto"
          mr="auto"
          bg={"yellows.1"}
          w="30rem"
          maxWidth={"100%"}
        >
          Add a product
        </CallToActionButton>
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
