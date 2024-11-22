
const enforceContract = require("../../utilities/enforceContract");
const AuthGateway = require("../../adapters/AuthGateway");
const ErrorTypes = require("../../utilities/errors/ErrorTypes");
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

const database = new PostgresDatabase();

  class AuthRepositoryPostgres extends AuthGateway  {
    constructor() {
      super()
      this.database = database;
      
      // Utility function to enforce AuthGateway contract. 
      //Dá erro se os metodos forem diferentes de AuthGateway
      enforceContract(this, AuthGateway);

    }
    async save(User, salt) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result = await this.database.query(
          'INSERT INTO users (email, name, password, role, salt) VALUES ($1, $2, $3, $4, $5)',
          [User.email, User.name, User.password, User.role, salt]
      );
      if (result.rowCount === 0) {
        throw ErrorTypes.DatabaseError('Failed to create user');
    }
      return true;
    }

    async updatePassword(User, salt) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result = await this.database.query(
        'UPDATE users SET password = $1, salt = $3 WHERE email = $2',
        [User.password, User.email, salt]
      )
      if (result.rowCount === 0) {
        throw ErrorTypes.DatabaseError('Error updating password');
      }
      return true
    }

    async updateUserName(User) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result = await this.database.query(
        'UPDATE users SET name = $1 WHERE email = $2',
        [User.name, User.email]
      )
      if (result.rowCount === 0) {
        throw ErrorTypes.DatabaseError('Error updating user');
      }
      return true
    }

    async findByEmail(email) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result = await this.database.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rowCount === 0) {
        return false
      }

      return result.rows[0]; 
    }

    async readAll() {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result =  await this.database.query('SELECT * FROM users');
      if (result.rowCount === 0) {
        throw ErrorTypes.NotFoundError('No users found');
      }
      return result.rows;
    }
 
 
  }

  module.exports = AuthRepositoryPostgres