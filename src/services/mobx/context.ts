import React from "react";

import { ModStore } from "./stores";
import { SongStore } from "./stores";

export const storesContext = React.createContext({
  modStore: new ModStore(),
  songStore: new SongStore(),
});
