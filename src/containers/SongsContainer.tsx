import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { toJS, isObservable, isObservableArray } from "mobx";
import { observer } from "mobx-react";

import { useStores } from "../services/mobx/useStores";
import { SongSortOrder } from "../services/apis/BeatSaverApi";

import SongList from "../views/Songs/SongList/SongList";

const SongsContainer: React.FC = () => {
  const { songStore } = useStores();

  useEffect(() => {
    console.log("useEffect SongsContainer");
    songStore.loadSongs(SongSortOrder.Rating);
  }, [songStore]);

  const loadSongs = (page = 0) => {
    return songStore.loadSongs(SongSortOrder.Rating, page);
  };

  console.log("rerender");

  return (
    <Switch>
      <Route path="/songs/rating">
        <SongList pages={songStore.songPages} loadSongs={loadSongs} />
      </Route>
      <Redirect to="/songs/rating" />
    </Switch>
  );
};

export default observer(SongsContainer);
