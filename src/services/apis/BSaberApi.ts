import axios, { AxiosInstance } from "axios";

export interface SongRatings {
  overall_rating: number;
  average_ratings: {
    fun_factor: number;
    rhythm: number;
    flow: number;
    pattern_quality: number;
    readability: number;
    level_quality: number;
  };
}

export default class BSaberApi {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BSABER_URL,
    });
  }

  async getSongRatings(key: string): Promise<SongRatings> {
    try {
      const res = await this.client.get<SongRatings>(`wp-json/bsaber-api/songs/${key}/ratings`);
      return res.data;
    } catch (error) {
      throw error.response;
    }
  }
}
