import { CSSProperties } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

// import TekoLight from "../assets/fonts/Teko/Teko-Light.ttf";
// import TekoRegular from "../assets/fonts/Teko/Teko-Regular.ttf";
// import TekoMedium from "../assets/fonts/Teko/Teko-Medium.ttf";
// import TekoSemiBold from "../assets/fonts/Teko/Teko-SemiBold.ttf";
// import TekoBold from "../assets/fonts/Teko/Teko-Bold.ttf";

// const tekoLight = {
//   fontFamily: "Teko",
//   fontStyle: "normal",
//   fontWeight: 300,
//   fontDisplay: "swap",
//   src: `local('Teko Light'), local('Teko-Light'), url(${TekoLight}) format('woff2')`,
// };
// const tekoRegular = {
//   fontFamily: "Teko",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontDisplay: "swap",
//   src: `local('Teko Regular'), local('Teko-Regular'), url(${TekoRegular}) format('woff2')`,
// };
// const tekoMedium = {
//   fontFamily: "Teko",
//   fontStyle: "normal",
//   fontWeight: 500,
//   fontDisplay: "swap",
//   src: `local('Teko Medium'), local('Teko-Medium'), url(${TekoMedium}) format('woff2')`,
// };
// const tekoSemiBold = {
//   fontFamily: "Teko",
//   fontStyle: "normal",
//   fontWeight: 600,
//   fontDisplay: "swap",
//   src: `local('Teko SemiBold'), local('Teko-SemiBold'), url(${TekoSemiBold}) format('woff2')`,
// };
// const tekoBold = {
//   fontFamily: "Teko",
//   fontStyle: "normal",
//   fontWeight: 700,
//   fontDisplay: "swap",
//   src: `local('Teko Bold'), local('Teko-Bold'), url(${TekoBold}) format('woff2')`,
// };

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
