import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SongsContainer from "../../containers/SongsContainer";
import ModsContainer from "../../containers/ModsContainer";
import Settings from "../../views/Settings/Settings";

import "./MainLayout.css";

const MainLayout: React.FC = () => {
  return (
    <Switch>
      <Route path="/songs">
        <SongsContainer />
      </Route>
      <Route path="/mods">
        <ModsContainer />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Redirect to="/settings" />
    </Switch>
  );
};

export default MainLayout;
