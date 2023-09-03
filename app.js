const express = require("express");
const app = express();
const { getGenres } = require("./controllers/genreControllers");

app.use(express.json());

app.get("/api/genres", getGenres);

module.exports = app;
