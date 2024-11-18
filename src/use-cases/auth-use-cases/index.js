const loginUseCase = require("./login");
const registerUseCase = require("./register");


class AuthUseCases {
    constructor(authRepository, authService) {
        this.authRepository = authRepository;
        this.authService = authService;
        this.login = loginUseCase(this.authRepository, this.authService);
        this.register = registerUseCase(this.authRepository, this.authService);
    }
    async loginUser(email, password) {
        return await this.login(email, password);
    }
    async registerUser(req_user) {
        return await this.register(req_user);
    }
}





module.exports = AuthUseCases


