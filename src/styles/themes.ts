import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

export enum DifficultiesColors {
  Easy = "#80c883",
  Normal = "#80b2c8",
  Hard = "#c8b480",
  Expert = "#c88080",
  ExpertPlus = "#db78de",
}

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#015989",
    },
    secondary: {
      main: "#660001",
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        "boxShadow": `0 5px 12px -2px ${purple[900]}`,
        "&:hover": {
          boxShadow: `0 7px 16px -2px ${purple[900]}`,
        },
      },
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#015989",
    },
    secondary: {
      main: "#660001",
    },
  },
  typography: {
    fontFamily: ["Teko", "sans-serif"].join(","),
    h1: { fontFamily: ["Beon", "sans-serif"].join(",") },
    h2: { fontFamily: ["Beon", "sans-serif"].join(",") },
    h3: { fontFamily: ["Beon", "sans-serif"].join(",") },
    h4: { fontFamily: ["Beon", "sans-serif"].join(",") },
    h5: { fontFamily: ["Beon", "sans-serif"].join(",") },
    h6: { fontFamily: ["Beon", "sans-serif"].join(",") },
    subtitle1: { fontFamily: ["Beon", "sans-serif"].join(",") },
    subtitle2: { fontFamily: ["Beon", "sans-serif"].join(",") },
  },
  props: {
    MuiButton: {
      variant: "contained",
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        "backgroundColor": "#015989",
        "boxShadow": "0 5px 12px -2px #015989",
        "&:hover": {
          backgroundColor: "#2087f5",
          boxShadow: "0 7px 16px -2px #015989",
        },
      },
    },
  },
});
