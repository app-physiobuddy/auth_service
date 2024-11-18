
const enforceContract = require("../../utilities/enforceContract");
const AuthGateway = require("../../adapters/gateways/AuthGateway");

  class AuthRepositoryPostgres extends AuthGateway  {
    constructor(database) {
      super()
      this.database = database;
      enforceContract(this, AuthGateway);

    }
    
    async save(User) {
        try {
            const result = await this.database.query('INSERT INTO users (email, name, password, role) VALUES ($1, $2, $3, $4)',
                [User.email, User.name, User.password, User.role]);
            console.log("User saved", result)
            return true
        } catch (error) {
            throw new Error('Database Register operation failed', error);
        }
      }
    async findByEmail(email) {
      if (!this.database) {
        throw new Error('DB connection is not initialized');
      }
      const result = await this.database.query('SELECT * FROM users WHERE email = $1', [email]);
      console.log("email in Auth Repository, undifined = doesn not exist", result.rows[0])
      return result.rows[0]; 
    }
 
 
  }

  module.exports = { AuthRepositoryPostgres}