import React from "react";
import classNames from "classnames/bind";
import { pipe, path, reject, equals, keys } from "ramda";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./Difficulties.module.scss";

const cx = classNames.bind(styles);

type Props = {
  song: Song;
  selected?: string;
  className?: string;
  onSelectDiff?: (diff: string) => void;
};
const Difficulties: React.FC<Props> = ({ song, selected, className = "", onSelectDiff }) => {
  const selectDiff = (diff: string) => {
    if (onSelectDiff) onSelectDiff(diff);
  };

  const difficulties: string[] = pipe(
    path(["metadata", "difficulties"]),
    reject(equals(false)),
    keys,
  )(song);

  return (
    <div className={cx("difficulties", className)}>
      {difficulties.map(diff => {
        let diffName;
        switch (diff) {
          case "easy":
            diffName = "easy";
            break;
          case "expert":
            diffName = "expert";
            break;
          case "expertPlus":
            diffName = "expert+";
            break;
          case "hard":
            diffName = "hard";
            break;
          case "normal":
            diffName = "normal";
            break;
          case "default":
            diffName = "unknown";
            break;
        }

        return (
          <span
            key={diff}
            className={cx("difficultyTag", diff, { selected: selected === diff })}
            onClick={() => selectDiff(diff)}
            style={{ cursor: onSelectDiff ? "pointer" : "initial" }}
          >
            {diffName}
          </span>
        );
      })}
    </div>
  );
};

export default Difficulties;
