import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SongsContainer from "../../containers/SongsContainer";
import ModsContainer from "../../containers/ModsContainer";

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
      <Redirect to="/songs" />
    </Switch>
  );
};

export default MainLayout;
