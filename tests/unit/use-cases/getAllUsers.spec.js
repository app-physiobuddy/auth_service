const getAllUsersUseCase = require("../../../src/use-cases/user-use-cases/getAllUsers")
const {User} = require("../../../src/entities/User")

// Mocks
const userRepositoryMock = require('../mocks/userRepositoryMock')


describe('UserUseCase - getAllUsers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get all users from a mock repository', async () => {
        // Arrange: Mock readAll to return a list of users
  

        // Act: Call the use case
        const allUsers = getAllUsersUseCase(userRepositoryMock);
        const userList = await allUsers()

       // Assert: Verify the results
       expect(userRepositoryMock.readAll).toHaveBeenCalledTimes(1); // Ensures readAll was called once
       expect(userList.length).toBe(2); // Expecting two users

       // Verify that each user in the list is an instance of User with the expected properties
       expect(userList[0]).toBeInstanceOf(User);
       expect(userList[0]).toEqual(expect.objectContaining({
           email: 'alice@example.com',
           name: 'Alice',
           password: 'password123',
           role: 'admin'
       }));
       
       expect(userList[1]).toBeInstanceOf(User);
       expect(userList[1]).toEqual(expect.objectContaining({
           email: 'bob@example.com',
           name: 'Bob',
           password: 'password456',
           role: 'user'
       }));

    });
    it('should return an empty list if no users are found in the repository', async () => {
        // Arrange: Mock readAll to return an empty array
        userRepositoryMock.readAll.mockResolvedValue([]);

        // Act: Call the use case
        const allUsers = getAllUsersUseCase(userRepositoryMock);
        const userList = await allUsers()

        // Assert
        expect(userRepositoryMock.readAll).toHaveBeenCalledTimes(1);
        expect(userList).toEqual([]); // Expecting an empty array
    });
  });