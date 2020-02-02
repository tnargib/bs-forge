import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toJS, isObservable, isObservableArray } from "mobx";
import { observer } from "mobx-react";

import { useStores } from "../services/mobx/useStores";
import { SongSortOrder } from "../services/apis/BeatSaverApi";

import SongList from "../views/Songs/SongList/SongList";

const SongsContainer: React.FC = () => {
  const { songStore } = useStores();

  const { loadSongs, order } = songStore;
  useEffect(() => {
    console.log("useEffect SongsContainer");
    loadSongs();
  }, [loadSongs, order]);

  const changeOrder = (filter: SongSortOrder): void => {
    return songStore.changeOrder(filter);
  };

  console.log("rerender");

  return (
    <Switch>
      <Route path="/songs/rating">
        <SongList
          pages={songStore.songPages}
          loadSongs={songStore.loadSongs}
          changeOrder={changeOrder}
        />
      </Route>
      <Redirect to="/songs/rating" />
    </Switch>
  );
};

export default observer(SongsContainer);
