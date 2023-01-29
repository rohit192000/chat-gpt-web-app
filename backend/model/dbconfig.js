const knex = require("knex")({
  debug: true,
  client: process.env.CLIENT,
  connection: {
    host: 'localhost',
    user: "root",
    database: 'products',
  },
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
