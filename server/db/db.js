const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL,
    {
        logging: false,
        dialect: "postgres"
    });

module.exports = db;