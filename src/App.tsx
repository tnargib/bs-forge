import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <MainLayout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
