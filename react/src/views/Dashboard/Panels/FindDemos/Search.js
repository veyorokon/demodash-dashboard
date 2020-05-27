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
  cursor: pointer;
  display: flex;
  border-radius: 0px 4px 4px 0px;
  justify-content: center;
  align-items: center;
  outline: none;
  border: unset;
`;

export default function Search(props) {
  return (
    <Box w={r("80rem ---------> 100rem")} maxWidth="100%">
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Find products to demo
        </Text>
      </Flex>
      <Flex alignItems="center" mb={5}>
        <SearchInput
          placeholder="search"
          width={"100%"}
          h={"4.8rem"}
          maxWidth="100%"
          fs={"1.4rem"}
          p={2}
          {...props}
        />
        <SearchButton
          hoverBackground="#FFC651"
          bg="yellows.1"
          h={"4.8rem"}
          w={"4.8rem"}
        >
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
