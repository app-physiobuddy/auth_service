// Makes the contract between dbrepository and usecases
// These are what the usecases need from the db's

class AuthGateway {
    constructor() {
        if (this.constructor === AuthGateway) {
            throw new Error("Abstract class 'AuthGateway' cannot be instantiated directly.");
        }
    }
    async findByEmail(email) {
        throw new Error("Method 'findByEmail()' must be implemented.");
    }
    async save(user) {
        throw new Error("Method 'save()' must be implemented.");
    }
}

module.exports = AuthGateway