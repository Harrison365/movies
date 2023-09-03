const db = require("../db/connection");

exports.fetchGenres = () => {
  return db.query("SELECT * FROM genres;").then((result) => {
    return result.rows;
  });
};
