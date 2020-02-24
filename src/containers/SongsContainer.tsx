import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { useStores } from "../services/mobx/useStores";

import SongList from "../views/Songs/SongList/SongList";
import SongDetailsSider from "../views/Songs/SongDetails/SongDetailsSider";

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
      <SongDetailsSider
        open={!!songStore.currentSong}
        song={songStore.currentSong}
        onClose={songStore.unselectSong}
      />
    </div>
  );
};

export default observer(SongsContainer);
