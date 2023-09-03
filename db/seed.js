const db = require("./connection");
const format = require("pg-format");

exports.seed = async ({ movies, reviews, users, genres }) => {
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS movies;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS genres;`);
  await db.query(`
    CREATE TABLE genres (
      slug VARCHAR PRIMARY KEY
    );`);
  await db.query(`
  CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    display_name VARCHAR NOT NULL,
    profile_pic VARCHAR,
    bio VARCHAR
  );`);
  await db.query(`
  CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    movie_name VARCHAR NOT NULL,
    director VARCHAR NOT NULL,
    release_year INT NOT NULL,
    duration INT NOT NULL,
    image_url VARCHAR,
    votes_up INT DEFAULT 0 NOT NULL,
    votes_down INT DEFAULT 0 NOT NULL,
    description VARCHAR NOT NULL,
    genre VARCHAR NOT NULL REFERENCES genres(slug)
  );`);
  await db.query(`
  CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    body VARCHAR NOT NULL,
    movie_id INT REFERENCES movies(movie_id) NOT NULL,
    username VARCHAR REFERENCES users(username) NOT NULL,
    votes_up INT DEFAULT 0 NOT NULL,
    votes_down INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );`);

  const insertGenresQueryString = format(
    `INSERT INTO genres (slug) VALUES %L;`,
    genres.map(({ slug }) => [slug])
  );
  await db.query(insertGenresQueryString);

  const insertUsersQueryString = format(
    `INSERT INTO users ( username, display_name, profile_pic, bio) VALUES %L;`,
    users.map(({ username, display_name, profile_pic, bio }) => [
      username,
      display_name,
      profile_pic,
      bio,
    ])
  );
  await db.query(insertUsersQueryString);

  const insertMoviesQueryString = format(
    `INSERT INTO movies ( movie_name, director, release_year, duration, image_url, votes_up, votes_down, description, genre) VALUES %L;`,
    movies.map(
      ({
        movie_name,
        director,
        release_year,
        duration,
        image_url,
        votes_up,
        votes_down,
        description,
        genre,
      }) => [
        movie_name,
        director,
        release_year,
        duration,
        image_url,
        votes_up,
        votes_down,
        description,
        genre,
      ]
    )
  );
  await db.query(insertMoviesQueryString);

  const insertReviewsQueryString = format(
    `INSERT INTO reviews ( body, movie_id, username, votes_up, votes_down) VALUES %L;`,
    reviews.map(({ body, movie_id, username, votes_up, votes_down }) => [
      body,
      movie_id,
      username,
      votes_up,
      votes_down,
    ])
  );
  await db.query(insertReviewsQueryString);
};
