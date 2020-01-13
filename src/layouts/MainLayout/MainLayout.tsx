import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import cx from "classnames";

import SongsContainer from "../../containers/SongsContainer";

import useStyles from "./MainLayoutStyle";

const MainLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={cx(classes.container)}>
      <div className={cx(classes.sidebar)}>
        <div className={cx(classes.menu)}>
          <div className={cx(classes.menuCategory)}>Mods</div>
          <div className={cx(classes.menuItem)}>Recommended</div>
          <div className={cx(classes.menuItem)}>All</div>
        </div>
      </div>
      <div className={cx(classes.content)}>
        <Switch>
          <Route path="/songs">
            <SongsContainer />
          </Route>
          <Redirect to="/songs" />
        </Switch>
      </div>
    </div>
  );
};

export default MainLayout;
