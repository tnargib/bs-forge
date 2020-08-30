/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const { BrowserWindow } = require("electron");
const { dialog } = require("electron");

const BaseIPC = require("./_BaseIPC");

class FileSystemChannel extends BaseIPC {
  getName() {
    return "filesystem-channel";
  }

  async selectFolder() {
    const win = BrowserWindow.getFocusedWindow();
    const res = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });

    return res.filePaths[0];
  }
}

module.exports = FileSystemChannel;
