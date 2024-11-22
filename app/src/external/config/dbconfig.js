const { Pool } = require('pg');
require('dotenv').config();

class PostgresDatabase {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

  }


  async query(sql, params) {
    return await this.pool.query(sql, params);
  }

}
module.exports = PostgresDatabase


