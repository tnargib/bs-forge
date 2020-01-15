import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";

import { ThemeProvider } from "./contexts/ThemeContext";

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
