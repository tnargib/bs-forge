import { decorate, observable, action, computed, toJS } from "mobx";

import BeatSaverApi, { SongPage, SongSortOrder } from "../../apis/BeatSaverApi";

const BEAT_SAVER = new BeatSaverApi();

class SongStore {
  order: SongSortOrder = SongSortOrder.Latest;
  pages: SongPage[] = [];

  get songPages() {
    return toJS(this.pages);
  }

  loadSongs = (page = 0): void => {
    BEAT_SAVER.listSongs(this.order, page).then(songPage => {
      this.pages.splice(page, 1, songPage);
    });
  };

  changeOrder = (order: SongSortOrder): void => {
    if (order !== this.order) {
      this.order = order;
      this.pages = [];
    }
  };
}

decorate(SongStore, {
  pages: observable,
  songPages: computed,
  loadSongs: action.bound,
});

export default new SongStore();
