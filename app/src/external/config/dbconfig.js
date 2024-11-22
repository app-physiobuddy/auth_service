const { Pool } = require('pg');

class PostgresDatabase {
  constructor() {
    this.pool = new Pool({
      host: 'physio_buddy_db',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'auth' 
    });
  }


  async query(sql, params) {
    return await this.pool.query(sql, params);
  }

}
module.exports = PostgresDatabase


