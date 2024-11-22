const authServiceMock = {
    hashPassword: jest.fn().mockResolvedValue("hashedPassword123"), // Mocked hashed password
    verifyPassword: jest.fn().mockResolvedValue(true),
    generateToken: jest.fn().mockResolvedValue("SimulatedToken"),
    decodeToken: jest.fn().mockResolvedValue({
        email: 'alice@example.com',
    })

};

module.exports = authServiceMock;