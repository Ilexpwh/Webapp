const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "ilex",
  port: 5432,
  database: "postgres"
});

//require changes when deploy on aws

//const Pool = require("pg").Pool;
//require("dotenv").config();

//const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

//const pool = new Pool({
  //connectionString:
    //process.env.NODE_ENV === "production" ? proConfig : devConfig,
//});

module.exports = pool;