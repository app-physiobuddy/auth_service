const { Pool } = require('pg');

class PostgresDatabase {
  constructor() {
    this.pool = new Pool({
      host: 'pg_auth_compose', // In a docker network use the container name or ip adress 127....
      port: 5432,
      user: 'postgres',
      password: 'pass',
      database: 'auth' 
    });
  }


  async query(sql, params) {
    return await this.pool.query(sql, params);
  }

}
module.exports = {PostgresDatabase}


