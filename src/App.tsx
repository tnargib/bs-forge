import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import MainLayout from "./layouts/MainLayout/MainLayout";

import { ThemeProvider } from "./contexts/ThemeContext";

library.add(fas);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <MainLayout />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
