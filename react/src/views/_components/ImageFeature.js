import React from "react";
import {Flex, Section, Grid, Box, Text, Image} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";

export const GridItemFlex = styled(Flex)`
  flex: 1 1 auto;
  flex-direction: column;
`;

export const FlexGrid = styled(Grid)`
  flex-direction: column;
`;

function ImageFeature(props) {
  return (
    <Section
      bg={"whites.0"}
      height={"fit-content"}
      overflow="hidden"
      {...props}
    >
      <Box
        ml={r("2 3 -----> 5 -> 6  7")}
        mr={r("2 3 -----> 5 -> 6  7")}
        p={r("2 ----> 4")}
        pt={r("5 -------->  6")}
        pb={r("5 -------->  6")}
        {...props}
      >
        <Flex
          justifyContent="flex-start"
          flexDirection="column"
          alignItems="center"
        >
          <FlexGrid
            gridColumnGap={"10%"}
            gridTemplateColumns={r("repeat(2,1fr)")}
            display={r("flex -----> grid")}
            flexDirection="column"
            w={r("100%")}
          >
            {props.imageAlign === "left" && (
              <GridItemFlex order={r("1 -----> 0")}>
                <Image
                  m="auto"
                  src={props.image}
                  maxWidth={"100%"}
                  w={"40rem"}
                />
              </GridItemFlex>
            )}
            <GridItemFlex justifyContent="center" mb={r("4 -----> 0")}>
              {props.subTitle && (
                <Text
                  mb={3}
                  lineHeight={"1.18"}
                  as="h3"
                  fw={700}
                  fs={r("1.4rem ---> 1.6rem")}
                  color={props.subTitleColor || "navys.2"}
                >
                  {props.subTitle}
                </Text>
              )}
              <Text
                mb={2}
                mt={2}
                lineHeight={"1.3"}
                letterSpacing={"-.8px"}
                as="h1"
                fs={r("3rem ----> 3.8rem")}
                color={props.titleColor || "navys.0"}
              >
                {props.title}
              </Text>
              <Text
                mt={3}
                mb={4}
                lineHeight={"1.3"}
                letterSpacing={"-.5px"}
                as="p"
                fw={400}
                fs={r("2rem --------> 2.2rem")}
                color={props.textColor || "navys.2"}
              >
                {props.text}
              </Text>
              {props.children && props.children}
            </GridItemFlex>
            {props.imageAlign !== "left" && (
              <GridItemFlex>
                <Image
                  m="auto"
                  src={props.image}
                  maxWidth={"100%"}
                  w={props.imageWidth || "40rem"}
                />
              </GridItemFlex>
            )}
          </FlexGrid>
        </Flex>
      </Box>
    </Section>
  );
}
export default ImageFeature;
