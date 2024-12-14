// Makes the contract between dbrepository and usecases
// These are what the usecases need from the db's
// and they are implemented in frameworks/repositories

class DbGatewayContract {
    constructor() {
        if (this.constructor === DbGatewayContract) {
            throw new Error("Abstract class 'DbGatewayContract' cannot be instantiated directly.");
        }
    }
    async findByEmail(email) {
        throw new Error("Method 'findByEmail()' must be implemented.");
    }
    async save(user, salt) {
        throw new Error("Method 'save()' must be implemented.");
    }
    async getAll() {
        throw new Error("Method 'getAll()' must be implemented.");
    }
    async updatePassword(User) {
        throw new Error("Method 'updatePassword()' must be implemented.");
    }
    async updateUser(User) {
        throw new Error("Method 'updateUser()' must be implemented.");
    }
    async updateRecoveryPasswordToken(User) {
        throw new Error("Method 'updateRecoveryPasswordToken()' must be implemented.");
    }
    async findByUserId(userId) {
        throw new Error("Method 'findByUserId()' must be implemented.");
    }
}

module.exports = DbGatewayContract