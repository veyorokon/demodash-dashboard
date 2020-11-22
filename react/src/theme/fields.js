/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import configure from "theme/config";
import {compose} from "styled-system";

/*
     Fields
 */
const overflow = configure("overflow");
const textAlign = configure("textAlign");
const alignSelf = configure("alignSelf");

const width = configure("width", "w", "space");
const height = configure("height", "h", "space");
const minHeight = configure("minHeight", [], "space");
const maxHeight = configure("maxHeight", [], "space");
const minWidth = configure("minWidth", [], "space");
const maxWidth = configure("maxWidth", [], "space");

const background = configure("background", ["bg", "background"], "colors");
const backgroundColor = configure("backgroundColor", [], "colors");
const backgroundImage = configure("backgroundImage");
const backgroundPosition = configure("backgroundPosition");
const backgroundPositionX = configure("backgroundPositionX", "bpx");
const backgroundPositionY = configure("backgroundPositionY", "bpy");
const backgroundSize = configure("backgroundSize");
const boxShadow = configure("boxShadow", [], "shadows");

const color = configure("color", "color", "colors");
const fill = configure("fill");

const fontWeight = configure("fontWeight", "fw", "fontWeights");
const fontSize = configure("fontSize", "fs", "fontSizes");
const lineHeight = configure("lineHeight", "lh");

const textTransform = configure("textTransform");
const cursor = configure("cursor");

const fontFamily = configure("fontFamily", ["fm"], "fonts");
const typography = compose(
  fontWeight,
  fontSize,
  lineHeight,
  textAlign,
  textTransform,
  cursor,
  alignSelf,
  fontFamily
);

const marginTop = configure("marginTop", ["marginTop", "mt"], "space");
const marginBottom = configure("marginBottom", ["marginBottom", "mb"], "space");
const marginLeft = configure("marginLeft", ["marginLeft", "ml"], "space");
const marginRight = configure("marginRight", ["marginRight", "mr"], "space");
const marginAll = configure("margin", "m", "space");

const margin = compose(
  marginAll,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight
);

const paddingTop = configure("paddingTop", ["paddingTop", "pt"], "space");
const paddingBottom = configure(
  "paddingBottom",
  ["paddingBottom", "pb"],
  "space"
);
const paddingLeft = configure("paddingLeft", ["paddingLeft", "pl"], "space");
const paddingRight = configure("paddingRight", ["paddingRight", "pr"], "space");
const paddingAll = configure("padding", "p", "space");

const padding = compose(
  paddingAll,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight
);

const transitionDuration = configure("transitionDuration", "duration");
const transitionTimingFunction = configure("transitionTimingFunction");
const transitionDelay = configure("transitionDelay", "delay");

const transitionFields = compose(
  transitionDuration,
  transitionTimingFunction,
  transitionDelay
);

const position = configure("position");
const top = configure("top");
const right = configure("right");
const bottom = configure("bottom");
const left = configure("left");

const positionFields = compose(
  position,
  top,
  right,
  bottom,
  left
);
const border = configure("border");
const borderStyle = configure("borderStyle");
const borderRight = configure("borderRight");
const borderLeft = configure("borderLeft");
const borderBottom = configure("borderBottom");
const borderTop = configure("borderTop");
const borderColor = configure("borderColor", [], "colors");

const borderFields = compose(
  border,
  borderStyle,
  borderRight,
  borderLeft,
  borderBottom,
  borderTop,
  borderColor
);

const borderRightColor = configure("borderRightColor", [], "colors");
const borderLeftColor = configure("borderLeftColor", [], "colors");
const borderBottomColor = configure("borderBottomColor", [], "colors");
const borderTopColor = configure("borderTopColor", [], "colors");

const display = configure("display");

const generics = compose(
  borderStyle,
  border,
  overflow,
  typography,
  margin,
  padding,
  background,
  color,
  width,
  height,
  transitionFields,
  positionFields,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  display,
  borderRightColor,
  borderLeftColor,
  borderBottomColor,
  borderTopColor,
  borderRight,
  borderLeft,
  borderBottom,
  borderTop
);

const animationDuration = configure("animationDuration");
const animationTimingFunction = configure("animationTimingFunction");
const animationDelay = configure("animationDelay");
const animationFillMode = configure("animationFillMode");

const animationFields = compose(
  animationDuration,
  animationTimingFunction,
  animationDelay,
  animationFillMode
);

const order = configure("order");
const flexGrow = configure("flexGrow");
const flexBasis = configure("flexBasis");
const flexDirection = configure("flexDirection");
const flexWrap = configure("flexWrap");
const justifyContent = configure("justifyContent");
const alignItems = configure("alignItems");

const flexFields = compose(
  order,
  display,
  flexGrow,
  flexDirection,
  flexWrap,
  justifyContent,
  flexBasis,
  alignItems
);

const borderRadius = configure("borderRadius", "br", "radii");
const opacity = configure("opacity");

const gridTemplateColumns = configure("gridTemplateColumns");
const gridColumnGap = configure("gridColumnGap");
const gridRowGap = configure("gridRowGap");

const gridFields = compose(
  gridTemplateColumns,
  gridColumnGap,
  gridRowGap
);

const letterSpacing = configure("letterSpacing");

export {
  generics,
  background,
  color,
  lineHeight,
  typography,
  fontWeight,
  fontSize,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  paddingTop,
  paddingLeft,
  paddingRight,
  animationFields,
  animationDuration,
  animationTimingFunction,
  animationDelay,
  animationFillMode,
  display,
  flexGrow,
  borderRadius,
  flexDirection,
  flexFields,
  width,
  height,
  paddingBottom,
  transitionFields,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
  opacity,
  position,
  top,
  right,
  bottom,
  left,
  positionFields,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  backgroundPositionX,
  backgroundPositionY,
  minHeight,
  overflow,
  textAlign,
  flexWrap,
  justifyContent,
  alignItems,
  minWidth,
  maxWidth,
  borderRightColor,
  borderLeftColor,
  borderBottomColor,
  borderTopColor,
  border,
  borderRight,
  borderLeft,
  borderBottom,
  borderTop,
  letterSpacing,
  borderStyle,
  textTransform,
  cursor,
  alignSelf,
  fill,
  gridTemplateColumns,
  gridColumnGap,
  gridRowGap,
  gridFields,
  order,
  backgroundColor,
  boxShadow,
  borderFields,
  fontFamily
};
