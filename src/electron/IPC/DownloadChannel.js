/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const { BrowserWindow } = require("electron");
const { download } = require("electron-dl");

const BaseIPC = require("./_BaseIPC");

class DownloadChannel extends BaseIPC {
  getName() {
    return "download-channel";
  }

  async downloadSong(params = {}) {
    const { url } = params;

    const win = BrowserWindow.getFocusedWindow();
    const res = await download(win, url, { saveAs: true });
    return res;
  }
}

module.exports = DownloadChannel;
