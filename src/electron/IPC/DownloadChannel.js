/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const { BrowserWindow } = require("electron");
const { download } = require("electron-dl");

class DownloadChannel {
  getName() {
    return "download-channel";
  }

  async handle(event, request) {
    const data = await this.exec(request.params);
    this.notify(event, request, data);
  }

  notify(event, request, data) {
    event.sender.send(request.responseChannel, data);
  }

  async exec(params = {}) {
    const { url } = params;

    try {
      const win = BrowserWindow.getFocusedWindow();
      const res = await download(win, url, { saveAs: true });
      return res;
    } catch (error) {
      return error;
    }
  }
}

module.exports = DownloadChannel;
