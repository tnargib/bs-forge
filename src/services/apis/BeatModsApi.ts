import axios, { AxiosInstance } from "axios";
import { reject, isNil } from "ramda";

export enum ModStatus {
  Approved = "approved",
  Declined = "declined",
  Pending = "pending",
  Inactive = "inactive",
}

export interface ModBase {
  _id: string;
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
  status: ModStatus;
  description: string;
  link: string;
  category: string;
  downloads: [
    {
      type: string;
      url: string;
      hashMd5: [
        {
          hash: string;
          file: string;
        },
      ];
    },
  ];
  required: boolean;
}

export interface ModLite extends ModBase {
  dependencies: string[];
}

export interface Mod extends ModBase {
  dependencies: ModLite[];
}

export default class BeatModsApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BEATMODS_URL,
    });
  }

  async listMods(filters: {
    status?: ModStatus;
    gameVersion: string;
    name?: string;
    category?: string;
    hash?: string;
  }): Promise<Mod[]> {
    try {
      const res = await this.client.get<Mod[]>(`/api/v1/mod`, {
        params: reject(isNil, filters),
      });
      return res.data;
    } catch (error) {
      throw error.response;
    }
  }
}
