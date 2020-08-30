/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");

const path = require("path");
const url = require("url");

const { DownloadChannel, FileSystemChannel } = require("./IPC");

require("electron-reload")(__dirname);

const isDev = process.env.NODE_ENV === "development";

function loadExtensions() {
  return installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      webSecurity: false, // BeatMods doesn't include Access-Control-Allow-Origin
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  const startUrl = isDev
    ? "http://localhost:3000"
    : url.format({
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file:",
        slashes: true,
      });
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
    loadExtensions();
  }

  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function onWindowAllClosed() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
}

function onActivate() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!mainWindow) {
    createWindow();
  }
}

function registerIpcChannels(ipcChannels) {
  ipcChannels.forEach(channel =>
    ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request)),
  );
}

function init(ipcChannels) {
  app.on("ready", createWindow);
  app.on("window-all-closed", onWindowAllClosed);
  app.on("activate", onActivate);

  registerIpcChannels(ipcChannels);
}

init([new DownloadChannel(), new FileSystemChannel()]);
