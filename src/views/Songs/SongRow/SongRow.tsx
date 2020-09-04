import React from "react";
import classNames from "classnames/bind";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ThumbUp, ThumbDown, AccountCircle } from "@material-ui/icons";

import Difficulties from "../../../components/Song/Difficulties/Difficulties";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./SongRow.module.scss";

const cx = classNames.bind(styles);

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 50,
      cursor: "pointer",
    },
    header: {
      display: "flex",
    },
  }),
);

type Props = {
  song: Song;
  onSelectSong: (song: Song) => void;
};

const SongRow: React.FC<Props> = ({ song, onSelectSong }) => {
  const classes = useStyles();
  const selectSong = () => {
    onSelectSong(song);
  };

  return (
    <div className={clsx(classes.container)} onClick={selectSong}>
      <div className={clsx(classes.header)}>
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
    </div>
  );
};

export default SongRow;
