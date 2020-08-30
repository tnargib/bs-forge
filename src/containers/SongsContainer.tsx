import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { useStores } from "../services/mobx/useStores";

import SongList from "../views/Songs/SongList/SongList";

const SongsContainer: React.FC = () => {
  const { songStore } = useStores();

  const { loadSongs, order } = songStore;
  useEffect(() => {
    console.log("useEffect SongsContainer");
    loadSongs();
  }, [loadSongs, order]);

  console.log("allLoadingPages", songStore.loadingPages);
  return (
    <div>
      <SongList
        search={songStore.search}
        order={order}
        pages={songStore.pages}
        loadingPages={songStore.loadingPages}
        loadSongs={songStore.loadSongs}
        changeOrder={songStore.changeOrder}
        selectSong={songStore.selectSong}
      />
    </div>
  );
};

export default observer(SongsContainer);
