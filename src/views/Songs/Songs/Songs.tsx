import React, { useEffect } from "react";
import { observer } from "mobx-react";
import classNames from "classnames/bind";

import { useStores } from "../../../services/mobx/useStores";

import SongList from "../SongList/SongList";
import SongDetails from "../SongDetails/SongDetails";

import styles from "./Songs.module.scss";

const cx = classNames.bind(styles);

const SongsContainer: React.FC = () => {
  const { songStore } = useStores();

  const { loadSongs, order } = songStore;
  useEffect(() => {
    console.log("useEffect SongsContainer");
    loadSongs();
  }, [loadSongs, order]);

  return (
    <div>
      <SongList
        order={order}
        pages={songStore.songPages}
        shrinked={!!songStore.currentSong}
        loadSongs={songStore.loadSongs}
        changeOrder={songStore.changeOrder}
        selectSong={songStore.selectSong}
      />
      <SongDetails song={songStore.currentSong} />
    </div>
  );
};

export default observer(SongsContainer);
