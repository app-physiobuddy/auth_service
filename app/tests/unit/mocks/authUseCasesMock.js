const {User} = require("../../../src/entities/User")

const userNew = new User('@example','Alice2', 'password123', 'admin')
const userRep = new User('alice@example.com','Alice', 'password123', 'admin')
const token = "SimulatedToken"

const authUseCases = {
    loginUser: jest.fn().mockResolvedValue(userNew, token), 
    registerUser: jest.fn().mockResolvedValue(true)
};

module.exports = authUseCases;