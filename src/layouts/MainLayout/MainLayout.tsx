import React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import cx from "classnames";

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
// const MainLayout: React.FC = () => {
//   return (
//     <div className={cx("container")}>
//       <div className={cx("content")}>
//         <Switch>
//           <Route path="/songs">
//             <SongsContainer />
//           </Route>
//           <Route path="/mods">
//             <ModsContainer />
//           </Route>
//           <Redirect to="/songs" />
//         </Switch>
//       </div>
//     </div>
//   );
// };

export default MainLayout;
