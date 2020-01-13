import React from "react";
import { SongStore } from "./stores";

export const storesContext = React.createContext({
  songStore: new SongStore(),
});
