const theme = {
  breakpoints: [
    "20em",
    "23.4em",
    "26.6em",
    "32.5em",
    "40em",
    "48em",
    "52em",
    "60.625em",
    "75em",
    "90em",
    "100em"
  ],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 384],
  fonts: {
    sans:
      "-apple-system, BlinkMacSystemFont, Oxygen, Ubuntu, Cantarell, Fira Sans, system-ui, sans-serif",
    mono: '"Consolas", "Courier", monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
  fontWeights: {
    normal: 400,
    bold: 700
  },
  colors: {
    blacks: ["#000", "#090909", "#111118"],
    whites: ["#fff", "#fafafa", "#F5F1F0"],
    greys: ["#7D8B98", "#e6eaef", "#EDEDED", "#edeff0", "#F4F5F9", "#A5A9BD"],
    oranges: ["#F87060", "#fd8368", "#ED8A70"],
    reds: ["#A3341A", "#DB4840"],
    greens: ["#596657", "#697268", "#65C24D", "#EDF9EA", "#0f9600"],
    navys: ["#112237", "#212C39", "#525F81", "#e6edff", "#f4f7ff"],
    darkBlues: ["#0B1750"],
    yellows: ["#FFC651", "#F7D590", "#FEF8E7"],
    purples: ["#8a8dcc"],
    blues: ["#1C47F5", "#6B64F6", "#f5f5ff", "#F7FAFD"]
  },
  radii: [0, 2, 4, 8, 14, 16],
  shadows: ["0 1px 6px rgba(57,73,76,0.35)"],
  defaultProps: {
    transition: "all",
    transitionDuration: "0.3s"
  }
};

export default theme;
