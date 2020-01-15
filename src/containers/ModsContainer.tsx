import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "../services/mobx/useStores";
import { SongSortOrder } from "../services/apis/BeatSaverApi";

import SongList from "../views/Songs/SongList/SongList";

const ModsContainer: React.FC = () => {
  const { songStore } = useStores();

  useEffect(() => {
    songStore.loadSongs(SongSortOrder.Rating);
  }, [songStore]);

  return <div>coucou</div>;
};

export default observer(ModsContainer);
