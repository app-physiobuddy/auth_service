
const {User} = require("../../../src/entities/User")

describe('User Entity', () => {
  it('should create a valid user', () => {
    const user = new User(
    "john@example.com",
    "John Doe",
    "123",
    "admin"
    );
    expect(user.email).toBe('john@example.com');
    expect(user.name).toBe('John Doe');
    expect(user.password).toBe('123');
    expect(user.role).toBe('admin');
  });
});
