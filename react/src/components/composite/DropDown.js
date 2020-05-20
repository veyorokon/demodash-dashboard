import React from "react";
import {Select, Option, Button, Icon} from "components";

import styled from "styled-components";
import {AddCircle} from "@styled-icons/material-rounded/AddCircle";

const DropSelect = styled(Select)`
  height: 3.5rem;
  background: transparent;
  border: 1px solid currentColor;
  cursor: pointer;
  text-align-last: right;
  padding-right: 30px;
  direction: rtl;
  &:focus {
    outline: none;
  }
  &::select {
    appearance: none;
  }
`;
const DropOption = styled(Option)`
  height: 3.5rem;
  color: currentColor;
`;

const DefaultButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 3px;
  font-size: 1.6rem;
  cursor: pointer;
  border: 1px solid currentColor;
  outline: none;
  background: transparent;
  padding: 0.5rem;
`;

export default props => {
  if (!props.options.length && props.useDefaultButton) {
    console.log(props.iconProps);
    return (
      <DefaultButton onClick={props.onDefaultClick} {...props}>
        <Icon mr={3} h={3} {...props.iconProps}>
          <AddCircle />
        </Icon>
        {props.defaultOption}
      </DefaultButton>
    );
  }
  return (
    <DropSelect fs={"1.6rem"} onChange={props.onChange} {...props}>
      {props.options.map((elem, index) => (
        <DropOption key={index} value={elem.value ? elem.value : index}>
          {elem.text}
        </DropOption>
      ))}
      {props.defaultOption && (
        <DropOption value={-1}>{props.defaultOption}</DropOption>
      )}
    </DropSelect>
  );
};
