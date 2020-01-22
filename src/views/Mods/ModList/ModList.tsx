import React from "react";
import cx from "classnames";
import { pipe, keys, equals, reject, path } from "ramda";

import { Mod } from "../../../services/apis/BeatModsApi";

import "./ModList.css";

type Props = {
  mods: Mod[];
};

const ModList: React.FC<Props> = props => {
  return (
    <div>
      <h2>Les mods</h2>
      {props.mods.map(mod => (
        <div key={mod._id}>
          <p>{mod.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ModList;
