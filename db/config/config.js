//require('dotenv').config();
const pg = require("pg");

module.exports = {
  dialect: "postgres",
  dialectModule: pg,
  host: "flora.db.elephantsql.com",
  username: "dglpmmgu",
  password: "XnHvdalyRXVR_gBgJ7DucysI6sn0QvAX",
  database: "dglpmmgu",
  define: {
    timestamps: false,
  }
}

/*
module.exports = {
  "development": {
    "dialect": "postgres",
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
    "dialect": "postgres",
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
    "dialect": "postgres",
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
*/