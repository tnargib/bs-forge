import React from "react";
import ReactDOM from "react-dom";
import * as mobx from "mobx";

import App from "./App";

import "./styles/index.css";

mobx.configure({ enforceActions: "observed" });

ReactDOM.render(<App />, document.getElementById("root"));
