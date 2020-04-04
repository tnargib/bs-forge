import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { useStores } from "../services/mobx/useStores";

import ModList from "../views/Mods/ModList/ModList";

const ModsContainer: React.FC = () => {
  const { modStore } = useStores();

  useEffect(() => {
    modStore.searchMods("song");
  }, [modStore]);

  return <ModList mods={modStore.allMods} />;
};

export default observer(ModsContainer);
