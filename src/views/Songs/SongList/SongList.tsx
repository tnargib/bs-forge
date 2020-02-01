import React from "react";
import cx from "classnames";

import SongRow from "../SongRow/SongRow";

import { Song } from "../../../services/apis/BeatSaverApi";

type Props = {
  songs: Song[];
};

const SongList: React.FC<Props> = props => {
  return (
    <>
      {props.songs.map(song => (
        <SongRow key={song._id} song={song} />
      ))}
    </>
  );
};

export default SongList;
