const Store = require("electron-store");

const schema = {
  settings: {
    game_location: { type: "string" },
  },
};

module.exports = new Store({ schema });
