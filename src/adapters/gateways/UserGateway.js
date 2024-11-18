class UserGateway {
    constructor() {
        if (this.constructor === UserGateway) {
            throw new Error("Abstract class 'UserGateway' cannot be instantiated directly.");
        }
    }
    async readAll() {
        throw new Error("Method 'readAll()' must be implemented.");
    }
    async getByName() {
        throw new Error("Method 'getByName()' must be implemented.");
    }
}

module.exports = UserGateway

