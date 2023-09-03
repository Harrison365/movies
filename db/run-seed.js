const db = require("./connection.js");
const devData = require("./data/dev-data/index");
const { seed } = require("./seed");

seed(devData).then(() => {
  db.end();
});
