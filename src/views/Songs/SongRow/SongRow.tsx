import React from "react";
import classNames from "classnames/bind";
import { pipe, keys, equals, reject, path } from "ramda";

import Button from "../../../components/Button/Button";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./SongRow.module.scss";

const cx = classNames.bind(styles);

type Props = {
  song: Song;
  onSelectSong: (song: Song) => void;
};

const SongRow: React.FC<Props> = ({ song, onSelectSong }) => {
  const selectSong = () => {
    onSelectSong(song);
  };

  const difficulties = pipe(path(["metadata", "difficulties"]), reject(equals(false)), keys);

  return (
    <div className={cx("container")} onClick={selectSong}>
      <div className={cx("cover")}>
        <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
      </div>
      <div className={cx("content")}>
        <h3>{song.name}</h3>
        <span>{song.metadata.songAuthorName}</span>
        <span>{song.metadata.levelAuthorName}</span>
        <div className={cx("difficulties")}>
          {difficulties(song).map((diff: string) => (
            <span key={diff} className={cx("difficultyTag")}>
              {diff}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongRow;
