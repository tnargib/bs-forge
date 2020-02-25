import React from "react";
import classNames from "classnames/bind";
import { pipe, keys, equals, reject, path } from "ramda";

import { ThumbUp, ThumbDown, AccountCircle } from "@material-ui/icons";

import Difficulties from "../../../components/Song/Difficulties/Difficulties";

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

        <Difficulties song={song} />

        <span className={cx("songUploader")}>
          <AccountCircle /> <span>{song.metadata.levelAuthorName}</span>
        </span>
      </div>
    </div>
  );
};

export default SongRow;
