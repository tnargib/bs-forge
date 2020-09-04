import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";

import { useStores } from "../../services/mobx/useStores";

import { Toolbar } from "@material-ui/core";

import SongList from "./SongList/SongList";
import SongDetails from "./SongDetails/SongDetails";
import Drawer from "../../components/Drawer/Drawer";
import SongHeader from "./SongHeader";

const useStyles = makeStyles({
  content: {
    display: "flex",
  },
});

const Songs: React.FC = () => {
  const classes = useStyles();
  const { songStore } = useStores();

  const { loadSongs, order } = songStore;
  useEffect(() => {
    console.log("useEffect SongsContainer");
    loadSongs();
  }, [loadSongs, order]);

  console.log("allLoadingPages", songStore.loadingPages);
  return (
    <div>
      <SongHeader loadSongs={loadSongs} />
      <Toolbar />

      <div className={classes.content}>
        <SongList
          search={songStore.search}
          order={order}
          pages={songStore.pages}
          loadingPages={songStore.loadingPages}
          loadSongs={songStore.loadSongs}
          changeOrder={songStore.changeOrder}
          selectSong={songStore.selectSong}
        />

        <Drawer open={!!songStore.currentSong}>
          <SongDetails />
        </Drawer>
      </div>
    </div>
  );
};

export default observer(Songs);
