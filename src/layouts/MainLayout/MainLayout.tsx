import React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import cx from "classnames";

import SongsContainer from "../../containers/SongsContainer";
import ModsContainer from "../../containers/ModsContainer";

import "./MainLayout.css";

import { useTheme } from "../../contexts/ThemeContext";

const MainLayout: React.FC = () => {
  const { setTheme } = useTheme();

  const _handleColor = (e: any) => {
    setTheme({
      "--primary-color": e.target.value,
    });
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")}>
        <div className={cx("menu")}>
          <NavLink to="/songs" activeClassName={cx("menuItemActive")} className={cx("menuItem")}>
            Songs
          </NavLink>
          <NavLink to="/mods" activeClassName={cx("menuItemActive")} className={cx("menuItem")}>
            Mods
          </NavLink>
          <input type="color" onChange={_handleColor} />
        </div>
      </div>
      <div className={cx("content")}>
        <Switch>
          <Route path="/songs">
            <SongsContainer />
          </Route>
          <Route path="/mods">
            <ModsContainer />
          </Route>
          <Redirect to="/songs" />
        </Switch>
      </div>
    </div>
  );
};

export default MainLayout;
