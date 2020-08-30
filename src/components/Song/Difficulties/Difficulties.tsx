import React from "react";
import classNames from "classnames/bind";
import { pipe, path, reject, equals, keys } from "ramda";
import { createStyles, makeStyles, fade } from "@material-ui/core/styles";

import { FormControl, InputLabel, Select, MenuItem, Box } from "@material-ui/core";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./Difficulties.module.scss";

const cx = classNames.bind(styles);

const useStyles = makeStyles(theme =>
  createStyles({
    diffSelect: {
      marginBottom: theme.spacing(3),
    },
    filled: {
      padding: "20px 12px 20px",
    },
  }),
);

type DifficultiesSelectProps = {
  song: Song;
  value?: string;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
};
const DifficultiesSelect: React.FC<DifficultiesSelectProps> = ({ song, value, onChange }) => {
  const classes = useStyles();

  const difficulties: string[] = pipe(
    path(["metadata", "difficulties"]),
    reject(equals(false)),
    keys,
  )(song);

  return (
    <FormControl
      classes={{ root: classes.diffSelect }}
      color="secondary"
      variant="filled"
      disabled={difficulties.length < 2}
    >
      <Select classes={{ filled: classes.filled }} value={value} onChange={onChange}>
        {difficulties.map(diff => (
          <MenuItem key={diff} value={diff}>
            {diff}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

type Props = {
  song: Song;
  selected?: string;
  className?: string;
  onSelectDiff?: (diff: string) => void;
};
const Difficulties: React.FC<Props> & { Select: React.FC<DifficultiesSelectProps> } = ({
  song,
  selected,
  className = "",
  onSelectDiff,
}) => {
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

Difficulties.Select = DifficultiesSelect;
export default Difficulties;
