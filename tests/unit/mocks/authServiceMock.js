const authServiceMock = {
    hashPassword: jest.fn().mockResolvedValue("hashedPassword123"), // Mocked hashed password
    comparePasswords: jest.fn().mockResolvedValue(true),
    generateToken: jest.fn().mockResolvedValue("SimulatedToken"),

};

module.exports = authServiceMock;