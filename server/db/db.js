const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;
