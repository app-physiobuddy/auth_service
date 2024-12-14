
const enforceContract = require("../../adapters/helpers/enforceContract");
const DbGatewayContract = require("../../adapters/DbGatewayContract");
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

  class AuthRepositoryPostgres extends DbGatewayContract  {
    constructor() {
      super()
      this.database = database;
      
      // Utility function to enforce AuthGateway contract. 
      //Dá erro se os metodos forem diferentes de AuthGateway
      enforceContract(this, DbGatewayContract);

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

    async updateUser(newUserData, currentEmail) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      console.log(newUserData)
      let result;
      if (newUserData.name && newUserData.email) {
        result = await this.database.query(
          'UPDATE users SET name = $1, email = $2 WHERE email = $3',
          [newUserData.name, newUserData.email, currentEmail]
        )
      }
      if (newUserData.name && !newUserData.email) {
        result = await this.database.query(
          'UPDATE users SET name = $1 WHERE email = $2',
          [newUserData.name, currentEmail]
        )
      }
      if (!newUserData.name && newUserData.email) {
        result = await this.database.query(
          'UPDATE users SET email = $1 WHERE email = $2',
          [newUserData.email, currentEmail]
        )
      }
     
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

    async getAll() {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result =  await this.database.query('SELECT * FROM users');
      if (result.rowCount === 0) {
        throw ErrorTypes.NotFoundError('No users found');
      }
      return result.rows;
    }
    
    // Operations on users_recovery table
    async findByUserId(userId) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }
      const result = await this.database.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (result.rowCount === 0) {
        return false
      }
      return result.rows[0];
    }

    async updateRecoveryPasswordToken(User, salt) {
      if (!this.database) {
        throw ErrorTypes.DatabaseError('DB connection is not initialized');
      }

      const result = await this.database.query(
        `UPDATE users
        SET reset_password_token = $1,
            recoverySalt = $2,
            reset_password_token_created_at = NOW(),
            reset_password_token_expires_at = NOW() + INTERVAL '10 minutes'
        WHERE email = $3
        RETURNING *;
       `,
        [User.resetPasswordToken, salt, User.email]
    );

      
      if (result.rowCount === 0) {
        throw ErrorTypes.DatabaseError('Error updating recovery token');
      }
      return true
    }
 
  }

  module.exports = AuthRepositoryPostgres