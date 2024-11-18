const getAllUsersUseCase = require('./getAllUsers')


class UsersUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.getAllUsers = getAllUsersUseCase(this.userRepository)
    }
    async getAll() {
        return await this.getAllUsers()
    }
}



module.exports = UsersUseCases


