export default class FileSystemConnector {
  api: Window["api"];
  channel: string;

  constructor() {
    this.api = window.api;
    this.channel = "filesystem-channel";
  }

  async selectFolder(): Promise<string> {
    try {
      const res = await this.api.call<{}, string>(this.channel, {
        command: "selectFolder",
        params: {},
      });

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
