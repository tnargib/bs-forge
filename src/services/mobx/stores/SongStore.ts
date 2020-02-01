import { decorate, observable, action, computed, toJS } from "mobx";

import BeatSaverApi, { SongPage, SongSortOrder } from "../../apis/BeatSaverApi";

const BEAT_SAVER = new BeatSaverApi();

class SongStore {
  pages: SongPage[] = [];

  get songPages() {
    return toJS(this.pages);
  }

  loadSongs = (order: SongSortOrder, page = 0): void => {
    BEAT_SAVER.listSongs(order, page).then(songPage => {
      this.pages.splice(page, 1, songPage);
    });
  };
}

decorate(SongStore, {
  pages: observable,
  songPages: computed,
  loadSongs: action.bound,
});

export default new SongStore();
