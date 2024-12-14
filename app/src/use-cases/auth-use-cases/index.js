const loginUseCase = require("./login");
const registerUseCase = require("./register");
const getAllUsersUseCase = require('./getAllUsers')
const changePasswordUseCase = require('./changePassword')
const recoverPasswordUseCase = require('./recoverPasswordUseCase')
const getUserUseCase = require("./getUserUseCase")
const editUserUseCase = require("./editUserUseCase")
const getUserByEmailUseCase = require("./getUserByEmailUseCase")

class AuthUseCases {
    constructor(authRepository, authProvider, emailProvider) {
        this.authRepository = authRepository;
        this.authProvider = authProvider;
        this.emailProvider = emailProvider

        this.loginUser_ = loginUseCase(this.authRepository, this.authProvider);
        this.registerUser_ = registerUseCase(this.authRepository, this.authProvider);
        this.getAll_ = getAllUsersUseCase(this.authRepository);
        this.changePassword_ = changePasswordUseCase(this.authRepository, this.authProvider);
        this.recoverPassword_ = recoverPasswordUseCase(this.authRepository, this.authProvider, this.emailProvider)
        this.getUser_ = getUserUseCase(this.authRepository, this.authProvider)
        this.editUser_ = editUserUseCase(this.authRepository, this.authProvider)
        this.getUSerByEmail_ = getUserByEmailUseCase(this.authRepository, this.authProvider)
    }
    async loginUser(email, password) {
        return await this.loginUser_(email, password);
    }
    async registerUser(req_user) {
        return await this.registerUser_(req_user);
    }
    async getAll() {
        return await this.getAll_()
    }
    async changePassword(token, oldPassword_raw, newPassword_raw) {
        return await this.changePassword_(token, oldPassword_raw, newPassword_raw)
    }
    async recoverPassword(userEmail, subject, text, html) {
        return await this.recoverPassword_.generateRecoveryToken(userEmail, subject, text, html)
    }
    async implementRecovery(userEmail, recoveryToken, newPassword) {
        return await this.recoverPassword_.loginWithRecoveryToken(userEmail, recoveryToken, newPassword)
    }
    async getUser(token) {
        return await this.getUser_(token)
    }
    async editUser(token, changes) {
        return await this.editUser_(token, changes)
    }
    async getUserByEmail(email) {
        return await this.getUSerByEmail_(email)
    }
}





module.exports = AuthUseCases


