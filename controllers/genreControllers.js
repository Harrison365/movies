const { fetchGenres } = require("../models/genreModels");

exports.getGenres = (req, res, next) => {
  fetchGenres().then((genres) => {
    res.status(200).send({ genres });
  });
};
