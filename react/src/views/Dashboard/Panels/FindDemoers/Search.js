import React from "react";
import {Box, Flex, Text, Icon, SearchInput, SearchButton} from "components";
import {responsive as r} from "lib";
import {Search as SearchIcon} from "@styled-icons/boxicons-regular/Search";

export default function Search(props) {
  return (
    <Box w={r("80rem ---------> 100rem")} maxWidth="100%">
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Find demoers for your campaigns
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
