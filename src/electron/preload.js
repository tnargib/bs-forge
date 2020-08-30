/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const { contextBridge, ipcRenderer } = require("electron");
const { v4 } = require("uuid");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  call: (channel, request) => {
    // If there's no responseChannel let's auto-generate it
    if (!request.responseChannel) request.responseChannel = `${channel}_response_${v4()}`;

    ipcRenderer.send(channel, request);

    // This method returns a promise which will be resolved when the response has arrived.
    return new Promise((resolve, reject) => {
      ipcRenderer.once(request.responseChannel, (event, response) => {
        if (response.isError) {
          reject(response.message);
        } else {
          resolve(response);
        }
      });
    });
  },
  receive: (channel, fn) => {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (event, ...args) => fn(...args));
  },
});
