const pg = require("pg");
const { DB_URL } = process.env;

const client = new pg.Client("postgres://localhost:5432/GraceGags");

module.exports = client;