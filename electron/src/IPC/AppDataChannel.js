const BaseIPC = require("./_BaseIPC");

const store = require("../AppStore");

class AppDataChannel extends BaseIPC {
  getName() {
    return "appdata-channel";
  }

  async getKey({ key }) {
    store.get(key);
  }
  async setKey({ key, data }) {
    store.set(key, data);
  }
}

module.exports = AppDataChannel;
