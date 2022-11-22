const pg = require("pg");
const { DB_URL } = process.env;

const client = new pg.Client(process.env.DB_URL ||"postgres://localhost:5432/GraceGags");

module.exports = client;