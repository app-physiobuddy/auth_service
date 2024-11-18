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

        const result = await login(userRepositoryMock, authServiceMock)(user);
        expect(result).toBe("Login: User not found in db");
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

        const result = await login(userRepositoryMock, authServiceMock)(user.email, user.password);

       // expect(userRepositoryMock.findByEmail).toHaveBeenCalled(1);
       // expect(authServiceMock.comparePasswords).toHaveBeenCalled(1)

       //{"result_user": {"email": "bob@example.com", "name": "Bob", "password": "password456", "role": "user"}, "token": "simulatedToken"}
        expect(result).toEqual({
            user: user,
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

        const result = await login(userRepositoryMock, authServiceMock)(user.email, user.password);
        expect(result).toEqual("Login: Invalid password");
    });
    
});