import { createUseStyles } from "react-jss";
import tinycolor from "tinycolor2";

export default createUseStyles({
  container: {
    display: "flex",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  content: {},
  menu: {
    "& > div": {
      marginBottom: 15,
    },
  },
  menuItem: {
    background: "blue",
    color: tinycolor.mostReadable("blue", [], { includeFallbackColors: true }).toHexString(),
    borderRadius: 8,
    padding: 10,
  },
  menuCategory: {
    color: "grey",
  },
});
