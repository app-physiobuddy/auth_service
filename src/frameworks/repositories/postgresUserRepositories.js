const UserGateway = require("../../adapters/gateways/UserGateway");
const enforceContract = require("../../utilities/enforceContract");

  class UserRepositoryPostgres extends UserGateway {
    constructor(database) {
      super()
      this.database = database;

      // Utility function to enforce IUser contract. 
      //Dá erro se os metodos forem diferentes de IUser
      enforceContract(this, UserGateway);
    }
    
    async readAll() {
      const result =  await this.database.query('SELECT * FROM users');
      return result.rows;
    }
    async getByName(name) {return name}

  }


  module.exports = { UserRepositoryPostgres}