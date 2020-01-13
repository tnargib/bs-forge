import { createUseStyles } from "react-jss";

export default createUseStyles({
  songItem: {
    display: "flex",
    marginBottom: 15,
  },
  songItemContent: {
    "paddingLeft": 20,
    "paddingRight": 20,
    "& h3": {
      margin: 0,
    },
  },
  cover: {
    width: 120,
    borderRadius: 15,
    boxShadow: "0px 5px 20px 0px rgba(0,0,0,.5)",
  },
  difficultyTag: {
    display: "inline-block",
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    lineHeight: "20px",
    borderRadius: 10,
    background: "cyan",
    marginRight: 10,
    fontSize: ".8em",
  },
});
