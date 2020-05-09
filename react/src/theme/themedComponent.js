import styled from "styled-components";

import theme, {generics} from ".";

export default function themedComponent(ComponentToLoad) {
  const component = styled(ComponentToLoad)`
    ${generics}
  `;
  component.defaultProps = {
    ...theme.defaultProps,
    ...component.defaultProps
  };
  return component;
}
