import styled from "styled-components";
import {Flex} from "components/core";
import {
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  backgroundPositionX,
  backgroundPositionY,
  backgroundColor
} from "theme/fields";

const ImageBox = styled(Flex)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.4s ease-in-out;
  height: 100%;
  ${backgroundImage}
  ${backgroundPosition}
  ${backgroundSize}
  ${backgroundPositionY}
  ${backgroundPositionX}
  ${backgroundColor}
`;

export default ImageBox;
