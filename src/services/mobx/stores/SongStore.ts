import { decorate, observable, action, computed, toJS } from "mobx";

import BeatSaverApi, { SongPage, SongSortOrder, Song } from "../../apis/BeatSaverApi";

const BEAT_SAVER = new BeatSaverApi();

class SongStore {
  order: SongSortOrder = SongSortOrder.Latest;
  pages: SongPage[] = [];
  currentSong?: Song = undefined;

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

  selectSong = (song: Song): void => {
    this.currentSong = song;
  };
  unselectSong = (): void => {
    this.currentSong = undefined;
  };
}

decorate(SongStore, {
  pages: observable,
  songPages: computed,
  currentSong: observable,
  loadSongs: action.bound,
});

export default new SongStore();
