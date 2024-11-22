const login = require("../../../src/use-cases/auth-use-cases/login")
const {User} = require("../../../src/entities/User")

const userRepositoryMock = require('../mocks/userRepositoryMock')
const authServiceMock = require('../mocks/authServiceMock')

describe("AuthUseCases - login", () => {
    it("should not login non existing user", async () => {
        const user = new User(
            "eample.com",
            "John Doe",
            "123",
            "admin"
        );
        try {
            await login(userRepositoryMock, authServiceMock)(user);
          } catch (error) {
            expect(error.name).toBe('UnauthorizedAcess');
            expect(error.message).toBe("User not found in db");
            expect(error.statusCode).toBe(403);
          }
    });

    it("should login a existing user with correct password", async () => {
        let expectedToken = "simulatedToken"
        authServiceMock.generateToken = jest.fn().mockReturnValue(expectedToken);
        
        const user = new User(
            "bob@example.com",
            "Bob",
            "password456",
            "user"
        );

        console.log(user.email, user.password)

        const result = await login(userRepositoryMock, authServiceMock)(user.email, user.password);
        expect(result).toEqual({
            email: user.email,
            name: user.name,
            role: user.role,
            token: expectedToken
        });
        
    });
    
    it("should not login a existing user with wrong password", async () => {
        authServiceMock.comparePasswords = jest.fn().mockResolvedValue(false)
        const user = new User(
            "bob@example.com",
            "Bob",
            "WrongPassword",
            "user"
        );
        try {
            await login(userRepositoryMock, authServiceMock)(user.email, user.password);
          } catch (error) {
            expect(error.name).toBe('AuthError');
            expect(error.message.public).toBe("Password does not match");
            expect(error.statusCode).toBe(401);
          }

    });
    
});