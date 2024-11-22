const register = require("../../../src/use-cases/auth-use-cases/register")
const {User} = require("../../../src/entities/User")


const mockUserRepository = require('../mocks/userRepositoryMock')
const authServiceMock = require('../mocks/authServiceMock')

describe("AuthUseCases - register", () => {

    it("should register a new user", async () => {
        const user = new User(
            "eample.com",
            "John Doe",
            "123",
            "admin"
        );
        const result = await register(mockUserRepository, authServiceMock)(user);

        expect(result).toBe(true);
    });

    it("should not register a repetitive user", async () => {
        const user = new User(
            "bob@example.com",
            "Bob",
            "password456",
            "user"
        );

        try {
            await register(mockUserRepository, authServiceMock)(user);
          } catch (error) {
            expect(error.name).toBe('ConflictError');
            expect(error.message).toBe("User already exists");
            expect(error.statusCode).toBe(409);
          }


    });
});

