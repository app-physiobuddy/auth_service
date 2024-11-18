const userRepositoryMock = {readAll : jest.fn(), findByEmail: jest.fn(), save: jest.fn()}
const mockUsers = [{ email: 'alice@example.com', name: 'Alice', password: 'password123', role: 'admin' },
    { email: "bob@example.com", name: 'Bob', password: 'password456', role: 'user' }];

userRepositoryMock.readAll.mockResolvedValue(mockUsers);

userRepositoryMock.findByEmail = (email) => {

    const result = mockUsers.find(user => user.email === email);
    return result
}



userRepositoryMock.save = (user) => {
    const result = mockUsers.push(user);
    //console.log("MockUserRepo.save", result)
    if (result) {
        return "um"
    } else {
        return false
    }
}


module.exports = userRepositoryMock