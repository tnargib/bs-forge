import React from "react";

import { ModStore, SongStore } from "./stores";

export const storesContext = React.createContext({
  modStore: new ModStore(),
  songStore: SongStore,
});
