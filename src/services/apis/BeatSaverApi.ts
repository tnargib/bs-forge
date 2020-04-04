import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import JSZip from "jszip";

export interface SongCharac {
  duration: number;
  length: number;
  njs: number;
  njsOffset: number;
  bombs: number;
  notes: number;
  obstacles: number;
}

export interface Song {
  metadata: {
    difficulties: {
      easy: boolean;
      expert: boolean;
      expertPlus: boolean;
      hard: boolean;
      normal: boolean;
    };
    duration: number;
    characteristics: [
      {
        difficulties: {
          [diff: string]: SongCharac | null;
          easy: SongCharac | null;
          normal: SongCharac | null;
          hard: SongCharac | null;
          expert: SongCharac | null;
          expertPlus: SongCharac | null;
        };
        name: string;
      },
    ];
    levelAuthorName: string;
    songAuthorName: string;
    songName: string;
    songSubName: string;
    bpm: number;
  };
  stats: {
    downloads: number;
    plays: number;
    downVotes: number;
    upVotes: number;
    heat: number;
    rating: number;
  };
  description: string;
  deletedAt: string | null;
  _id: string;
  key: string;
  name: string;
  uploader: {
    _id: string;
    username: string;
  };
  hash: string;
  uploaded: string;
  directDownload: string;
  downloadURL: string;
  coverURL: string;
}

export interface SongPage {
  docs: Song[];
  totalDocs: number;
  lastPage: number;
  prevPage?: number;
  nextPage?: number;
}

export enum SongSortOrder {
  Hot = "hot",
  Latest = "latest",
  Rating = "rating",
  Download = "downloads",
  Played = "plays",
}

export default class BeatSaverApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BEATSAVER_URL,
    });
  }

  async search(search: string, page = 0): Promise<SongPage> {
    try {
      const res = await this.client.get<SongPage>(`/api/search/text/${page}`, {
        params: {
          q: search,
        },
      });
      return res.data;
    } catch (error) {
      throw error.response;
    }
  }

  async listSongs(order: SongSortOrder, page = 0): Promise<SongPage> {
    try {
      const res = await this.client.get<SongPage>(`/api/maps/${order}/${page}`);
      return res.data;
    } catch (error) {
      throw error.response;
    }
  }

  async downloadSongAudio(
    url: string,
    onDownloadProgress?: AxiosRequestConfig["onDownloadProgress"],
  ): Promise<string | null> {
    try {
      const res = await this.client.get<ArrayBuffer>(url, {
        responseType: "arraybuffer",
        onDownloadProgress,
      });

      const zip = await JSZip.loadAsync(res.data);
      const audioFile = zip.file(/\.(ogg|mp3|egg|wav)$/)[0];

      let urlObj;
      if (audioFile) {
        const blob = await audioFile.async("blob");
        urlObj = URL.createObjectURL(blob);
      }

      return urlObj || null;
    } catch (error) {
      throw error.response;
    }
  }
}
