const genresRouter = require("express").Router();
const { getGenres } = require("../controllers/genreControllers");

genresRouter.get("/", getGenres);

module.exports = genresRouter;
