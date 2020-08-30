import { observable, action, reaction, runInAction } from "mobx";

import BeatSaverApi, { SongPage, SongSortOrder, Song } from "../../apis/BeatSaverApi";
import BSaberApi, { SongRatings } from "../../apis/BSaberApi";

const BEAT_SAVER = new BeatSaverApi();
const BSABER = new BSaberApi();

class SongStore {
  @observable order: SongSortOrder = SongSortOrder.Latest;
  @observable pages: SongPage[] = [];
  @observable loadingPages: number[] = [];
  @observable currentSong?: Song = undefined;
  @observable currentSongAudio?: string = undefined;
  @observable currentAudioPreviewProgress = 0;
  @observable currentSongRatings?: SongRatings = undefined;
  @observable search = "";

  @action
  loadSongs = async (search = "", page = 0): Promise<void> => {
    runInAction(() => {
      this.search = search;
      if (page === 0) this.pages = [];
      this.loadingPages.push(page);
    });

    let songPage: SongPage;
    if (search) {
      songPage = await BEAT_SAVER.search(search, page);
    } else {
      songPage = await BEAT_SAVER.listSongs(this.order, page);
    }

    console.log("Fetched page", songPage);
    runInAction(() => {
      this.loadingPages = this.loadingPages.filter(idx => idx !== page);
      this.pages.splice(page, 1, songPage);
    });
  };

  @action
  changeOrder = (order: SongSortOrder): void => {
    if (order !== this.order) {
      this.order = order;
      this.pages = [];
    }
  };

  @action
  selectSong = (song: Song): void => {
    console.log("select song", song);
    this.currentSong = song;
    this.currentSongAudio = undefined;
  };
  @action
  unselectSong = (): void => {
    this.currentSong = undefined;
    this.currentSongAudio = undefined;
  };

  loadSongDetails = reaction(
    () => this.currentSong,
    async (song?: Song) => {
      try {
        if (!song) return;

        const isCurrent = () => this.currentSong && this.currentSong.key === song.key;

        const _handleProgress = (progressEvent: { loaded: number; total: number }) => {
          if (!isCurrent()) return;
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          runInAction(() => {
            this.currentAudioPreviewProgress = percent;
          });
        };

        const [audio, ratings] = await Promise.all([
          BEAT_SAVER.downloadSongAudio(song.directDownload, _handleProgress),
          BSABER.getSongRatings(song.key),
        ]);

        if (audio && isCurrent()) {
          runInAction(() => {
            this.currentSongAudio = audio;
            this.currentSongRatings = ratings || undefined;
          });
        }
      } catch (error) {
        console.error("Error loading song details", error);
      }
    },
  );
}

export default SongStore;
