// Auth Dependiencies
const {AuthRepositoryPostgres} = require("../repositories/postgresAuthRepositories")
//const {AuthPresenter} = require("../adapters/presenters")
const AuthUseCases = require("../../use-cases/auth-use-cases")
const AuthController = require("../../adapters/controllers/AuthController")
const AuthProvider = require("../providers/AuthProvider")

const {V4} = require('paseto');




function fakePresenter() {
    return function (arg) {
        return arg;
    }
}
pasetoKey = "123456789111111a"
const authProvider = new AuthProvider(V4,pasetoKey);

class AuthFactory {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;

    }
    authController() {
        const authRepository = new AuthRepositoryPostgres(this.dbConnection);
        const authUseCases = new AuthUseCases(authRepository, authProvider);
        const authPresenter = fakePresenter();
        return new AuthController(authUseCases, authPresenter);
    }
}

module.exports = AuthFactory