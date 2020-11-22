import React from "react";
import {Select, Option, Button, Icon, Flex, Text} from "components";
import {themedComponent, borderFields} from "theme";
import styled from "styled-components";
import {AddCircle} from "@styled-icons/material-rounded/AddCircle";

const DropSelect = themedComponent(styled(Select)`
  height: 3.5rem;
  background: white;
  cursor: pointer;
  appearance: none;
  /*text-align-last: right;*/
  /*direction: rtl;*/

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(0.8em + 2px),
    calc(100% - 15px) calc(0.8em + 2px), calc(100% - 2.5em) 0.3em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
  }
  ${borderFields}
`);
const DropOption = styled(Option)`
  height: 3.5rem;
  color: currentColor;
`;

const DefaultButton = styled(Button)`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  cursor: pointer;
  justify-content: center;
  border: 1px solid currentColor;
  outline: none;
  background: transparent;
`;

export default props => {
  if (!props.options.length && props.useDefaultButton) {
    if (props.defaultButtonProps)
      return (
        <DefaultButton
          br={2}
          onClick={props.defaultClick}
          {...props}
          {...props.defaultButtonProps}
        >
          <Flex alignItems="center">
            <Icon ml={3} mr={1} h={"2.2rem"} {...props.iconProps}>
              <AddCircle />
            </Icon>
            <Text ml={4}>{props.defaultButtonText}</Text>
          </Flex>
        </DefaultButton>
      );
    return (
      <DefaultButton br={2} onClick={props.defaultClick} {...props}>
        <Flex alignItems="center">
          <Icon ml={3} mr={1} h={"2.2rem"} {...props.iconProps}>
            <AddCircle />
          </Icon>
          <Text ml={4}>{props.defaultButtonText}</Text>
        </Flex>
      </DefaultButton>
    );
  }
  return (
    <DropSelect
      pl={2}
      pr={"4.2rem"}
      fs={"1.6rem"}
      onChange={props.onChange}
      {...props}
    >
      {props.hiddenOption && (
        <DropOption selected disabled hidden>
          {props.hiddenOption}
        </DropOption>
      )}
      {props.options.map((elem, index) => (
        <DropOption key={index} value={elem.value ? elem.value : index}>
          {elem.text}
        </DropOption>
      ))}
      {props.defaultOption && (
        <DropOption selected value={props.defaultOption.value || -1}>
          {props.defaultOption}
        </DropOption>
      )}
    </DropSelect>
  );
};
