import axios, { AxiosInstance } from "axios";

export interface Mod {
  name: string;
  version: string;
  gameVersion: string;
  authorId: string;
  uploadDate: string;
  updatedDate: string;
  author: {
    _id: string;
    username: string;
    lastLogin: string;
  };
  status: string;
  description: string;
  link: string;
  category: string;
  downloads: {
    type: string;
    url: string;
    hashMd5: {
      hash: string;
      file: string;
    }[];
  }[];
  required: boolean;
  dependencies: {
    _id: string;
    name: string;
    description: string;
    authorId: string;
    version: string;
    gameVersion: string;
    link: string;
    updatedDate: string;
    uploadDate: string;
    status: string;
    downloads: {
      type: string;
      url: string;
      hashMd5: {
        hash: string;
        file: string;
      }[];
    }[];
    category: string;
    required: boolean;
    dependencies: string[];
  }[];
  _id: string;
}

export enum SongSortOrder {
  Hot = "hot",
  Latest = "latest",
  Rating = "rating",
  Download = "downloads",
  Played = "plays",
}

export default class BeatModsApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BEATMODS_URL,
    });
  }

  async listMods(status, gameVersion, name, category, hash): Promise<SongPage> {
    try {
      const res = await this.client.get<SongPage>(`/api/maps/${order}/${page}`);
      return res.data;
    } catch (error) {
      throw error.response;
    }
  }
}
