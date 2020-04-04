export default class DownloadConnector {
  api: Window["api"];
  channel: string;

  constructor() {
    this.api = window.api;
    this.channel = "download-channel";
  }

  async downloadByUrl(url: string): Promise<{ data: string }> {
    try {
      const res = await this.api.call<{ url: string }, { data: string }>(this.channel, {
        command: "download",
        params: { url },
      });

      if (res instanceof Error) throw res;

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
