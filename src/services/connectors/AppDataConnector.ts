export type Settings = {
  game_location: string;
};

export default class AppDataConnector {
  api: Window["api"];
  channel: string;

  constructor() {
    this.api = window.api;
    this.channel = "appdata-channel";
  }

  async getSettings(): Promise<Settings> {
    try {
      const res = await this.api.call<{ key: "settings" }, Settings>(this.channel, {
        command: "getKey",
        params: { key: "settings" },
      });

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async setSettings(settings: Settings): Promise<Settings> {
    try {
      const res = await this.api.call<{ key: "settings"; data: Settings }, Settings>(this.channel, {
        command: "setKey",
        params: { key: "settings", data: settings },
      });

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
