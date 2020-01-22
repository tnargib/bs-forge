import { decorate, observable, computed, action } from "mobx";

import BeatModsApi, { Mod } from "../../apis/BeatModsApi";

const BEAT_MODS = new BeatModsApi();

class ModStore {
  mods: Mod[] = [];

  get allMods(): Mod[] {
    return this.mods;
  }

  searchMods(name: string): void {
    BEAT_MODS.listMods({ name, gameVersion: "1.6.0" }).then(mods => {
      this.mods = mods;
    });
  }
}

decorate(ModStore, {
  mods: observable,
  allMods: computed,
  searchMods: action,
});

export default ModStore;
