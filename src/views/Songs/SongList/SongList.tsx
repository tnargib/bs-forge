import React from "react";
import cx from "classnames";
import { pipe, keys, equals, reject, path } from "ramda";

import { Song } from "../../../services/apis/BeatSaverApi";

import useStyles from "./SongListStyle";

type Props = {
  songs: Song[];
};

const SongList: React.FC<Props> = props => {
  const classes = useStyles();

  const difficulties = pipe(path(["metadata", "difficulties"]), reject(equals(false)), keys);

  return (
    <>
      {props.songs.map(song => (
        <div key={song._id} className={cx(classes.songItem)}>
          <img
            className={cx(classes.cover)}
            src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL}
            alt=""
          />
          <div className={cx(classes.songItemContent)}>
            <h3>{song.name}</h3>
            <p>{song.metadata.songAuthorName}</p>
            <p>{song.metadata.levelAuthorName}</p>
            {difficulties(song).map((diff: string) => (
              <span key={diff} className={cx(classes.difficultyTag)}>
                {diff}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SongList;
