require('dotenv').config();
const pg = require("pg");


module.exports = {
  "development": {
    "dialect": process.env.DB_DIALECT,
    "dialectModule": pg,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_BASE,
    "define": {
      timestamps: process.env.DB_TIMESTAMPS,
    },
  },
  "test": {
    "dialect": process.env.DB_DIALECT,
    "dialectModule": pg,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_BASE,
    "define": {
      timestamps: process.env.DB_TIMESTAMPS,
    },
  },
  "production": {
    "dialect": process.env.DB_DIALECT,
    "dialectModule": pg,
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_BASE,
    "define": {
      timestamps: process.env.DB_TIMESTAMPS,
    },
  }
}