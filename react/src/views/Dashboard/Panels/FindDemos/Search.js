import React from "react";
import {Box, Flex, Text, Input, Icon, Button} from "components";
import {responsive as r} from "lib";
import {Search as SearchIcon} from "@styled-icons/boxicons-regular/Search";
import styled from "styled-components";

const SearchInput = styled(Input)`
  border-radius: 4px 0px 0px 4px;
  border-right: unset;
  border-color: #dae0e6;
`;
const SearchButton = styled(Button)`
  display: flex;
  border-radius: 0px 4px 4px 0px;
  justify-content: center;
  align-items: center;
  outline: none;
  border: unset;
`;

export default function Search(props) {
  return (
    <Box w={"80rem"} maxWidth="100%">
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Find product demos
        </Text>
      </Flex>
      <Flex alignItems="center">
        <SearchInput
          placeholder="search"
          width={"100%"}
          h={"3.6rem"}
          maxWidth="100%"
          fs={"1.4rem"}
          p={2}
          {...props}
        />
        <SearchButton bg="yellows.1" h={"3.6rem"} w={"3.6rem"}>
          <Icon
            justifyContent="center"
            h={r("2rem -------> 2.2rem")}
            w={r("2rem -------> 2.2rem")}
          >
            <SearchIcon />
          </Icon>
        </SearchButton>
      </Flex>
    </Box>
  );
}
