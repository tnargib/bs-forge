import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { flatten, pluck, last } from "ramda";

import SongRow from "../SongRow/SongRow";
import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";

import { Song, SongPage, SongSortOrder } from "../../../services/apis/BeatSaverApi";

import styles from "./SongDetails.module.scss";

const cx = classNames.bind(styles);

type Props = {
  song: Song;
};
const SongDetails: React.FC<Props> = ({ song }) => {
  return (
    <div className={cx("songDetails")}>
      <div>{song.description}</div>
      <div>{song.stats.upVotes}</div>
      <div>{song.stats.downVotes}</div>
    </div>
  );
};

export default SongDetails;
