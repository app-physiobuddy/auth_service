// Makes the contract between dbrepository and usecases
// These are what the usecases need from the db's
// and they are implemented in frameworks/repositories

class AuthGateway {
    constructor() {
        if (this.constructor === AuthGateway) {
            throw new Error("Abstract class 'AuthGateway' cannot be instantiated directly.");
        }
    }
    async findByEmail(email) {
        throw new Error("Method 'findByEmail()' must be implemented.");
    }
    async save(user, salt) {
        throw new Error("Method 'save()' must be implemented.");
    }
    async readAll() {
        throw new Error("Method 'readAll()' must be implemented.");
    }
    async updatePassword(User) {
        throw new Error("Method 'updatePassword()' must be implemented.");
    }
    async updateUserName(User) {
        throw new Error("Method 'updateUser()' must be implemented.");
    }
}

module.exports = AuthGateway