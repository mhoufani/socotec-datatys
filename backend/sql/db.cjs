const { Pool } = require('pg');
const chalk = require('chalk');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

pool.on('error', (err) => {
  console.log(chalk.hex('#34ace0').bold(err));
});

module.exports = pool;
