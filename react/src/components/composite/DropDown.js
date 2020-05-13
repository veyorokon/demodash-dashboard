import React from "react";
import {Select, Option, Button} from "components";

import styled from "styled-components";

const DropSelect = styled(Select)`
  height: 3.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::select {
    appearance: none;
  }
`;
const DropOption = styled(Option)`
  height: 3.5rem;
`;

const DefaultButton = styled(Button)`
  border-radius: 3px;
  font-size: 1.4rem;
  cursor: pointer;
  border: unset;
  outline: none;
`;

export default props => {
  if (!props.options.length && props.useDefaultButton) {
    return (
      <DefaultButton p={3} onClick={props.onDefaultClick}>
        {props.defaultOption}
      </DefaultButton>
    );
  }
  return (
    <DropSelect
      color={"whites.0"}
      ml={"auto"}
      mr={"auto"}
      fs={"1.6rem"}
      onChange={props.onChange}
    >
      {props.options.map((elem, index) => (
        <DropOption key={index} value={elem.id ? elem.id : index}>
          {elem.text}
        </DropOption>
      ))}
      {props.defaultOption && (
        <DropOption value={props.options.length}>
          {props.defaultOption}
        </DropOption>
      )}
    </DropSelect>
  );
};
