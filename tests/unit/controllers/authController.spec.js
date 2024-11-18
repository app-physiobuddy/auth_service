const AuthController = require("../../../src/adapters/controllers/AuthController")
const authUseCases = require("../mocks/authUseCasesMock")
const authPresenter = "1"

describe("AuthController - login", () => {
    const user = {
        body: {
            email: "eample.com",
            password: "123",
    
        }
    }
    it("login is sucefull", async () => {
        const authController = new AuthController(authUseCases, authPresenter)
        const result = await authController.login(user)
        expect(result).toBe("Login: User not found in db");
    })
})