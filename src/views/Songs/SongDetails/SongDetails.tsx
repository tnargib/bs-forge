import React from "react";
import classNames from "classnames/bind";
import { flatten, pluck, last } from "ramda";

import Button from "../../../components/Button/Button";

import { ThumbUp, ThumbDown, AccountCircle } from "@material-ui/icons";

import { Song, SongPage, SongSortOrder } from "../../../services/apis/BeatSaverApi";

import styles from "./SongDetails.module.scss";

const cx = classNames.bind(styles);

type Props = {
  song?: Song;
};
const SongDetails: React.FC<Props> = ({ song }) => {
  if (!song) return null;

  return (
    <div className={cx("songDetails")}>
      <div className={cx("cover")}>
        <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
      </div>

      <div className={cx("title")}>{song.key}</div>
      <div className={cx("title")}>{song.metadata.songName}</div>
      <div className={cx("artist")}>{song.metadata.songAuthorName}</div>
      <div className={cx("songLikes")}>
        <ThumbUp />
        <span>{song.stats.upVotes}</span>
        <ThumbDown />
        <span>{song.stats.downVotes}</span>
      </div>

      <audio src={song.downloadURL}></audio>
    </div>
  );
};

export default SongDetails;
