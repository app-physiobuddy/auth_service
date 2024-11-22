const loginUseCase = require("./login");
const registerUseCase = require("./register");
const getAllUsersUseCase = require('./getAllUsers')
const changePasswordUseCase = require('./changePassword')


class AuthUseCases {
    constructor(authRepository, authService) {
        this.authRepository = authRepository;
        this.authService = authService;
        this.login = loginUseCase(this.authRepository, this.authService);
        this.register = registerUseCase(this.authRepository, this.authService);
        this.getAllUsers = getAllUsersUseCase(this.authRepository);
        this.changeUserPassword = changePasswordUseCase(this.authRepository, this.authService);
    }
    async loginUser(email, password) {
        return await this.login(email, password);
    }
    async registerUser(req_user) {
        return await this.register(req_user);
    }
    async getAll() {
        return await this.getAllUsers()
    }
    async changePassword(token, oldPassword_raw, newPassword_raw) {
        return await this.changeUserPassword(token, oldPassword_raw, newPassword_raw)
    }
}





module.exports = AuthUseCases


