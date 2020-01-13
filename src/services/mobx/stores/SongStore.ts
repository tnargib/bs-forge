import { decorate, observable, computed, action } from "mobx";
import { pluck, flatten } from "ramda";

import BeatSaverApi, { Song, SongPage, SongSortOrder } from "../../apis/BeatSaverApi";

const BEAT_SAVER = new BeatSaverApi();

class SongStore {
  pages: SongPage[] = [];

  get allSongs(): Song[] {
    return flatten(pluck("docs", this.pages));
  }

  loadSongs(order: SongSortOrder, page = 0): void {
    BEAT_SAVER.listSongs(order, page).then(songPage => {
      this.pages[page] = songPage;
    });
  }
}

decorate(SongStore, {
  pages: observable,
  allSongs: computed,
  loadSongs: action,
});

export default SongStore;
