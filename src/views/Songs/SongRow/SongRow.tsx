import React from "react";
import classNames from "classnames/bind";
import { pipe, keys, equals, reject, path } from "ramda";

import { ThumbUp, ThumbDown, AccountCircle } from "@material-ui/icons";

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

  const renderDifficulties = (song: Song) => {
    const difficulties: string[] = pipe(
      path(["metadata", "difficulties"]),
      reject(equals(false)),
      keys,
    )(song);

    return difficulties.map(diff => {
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
        <span key={diff} className={cx("difficultyTag", diff)}>
          {diffName}
        </span>
      );
    });
  };

  return (
    <div className={cx("container")} onClick={selectSong}>
      <div className={cx("cover")}>
        <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
      </div>
      <div className={cx("content")}>
        <h3>{song.name}</h3>
        <span className={cx("songAuthor")}>{song.metadata.songAuthorName}</span>
        <div className={cx("songLikes")}>
          <ThumbUp />
          <span>{song.stats.upVotes}</span>
          <ThumbDown />
          <span>{song.stats.downVotes}</span>
        </div>
        <div className={cx("difficulties")}>{renderDifficulties(song)}</div>
        <span className={cx("songUploader")}>
          <AccountCircle /> <span>{song.metadata.levelAuthorName}</span>
        </span>
      </div>
    </div>
  );
};

export default SongRow;
