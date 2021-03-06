import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

import Songs from "./views/Songs/Songs";
import Settings from "./views/Settings/Settings";

import { darkTheme } from "./styles/themes";

library.add(fas);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/songs">
              <Songs />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Redirect to="/settings" />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
