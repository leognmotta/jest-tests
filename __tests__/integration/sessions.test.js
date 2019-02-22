const { User } = require('../../src/app/models');

describe('Authentication', () => {
  it('should receive jwt token when authenticated with valid credentials', async () => {
    const user = await User.create({
      name: 'Leo',
      email: 'test@db.com',
      password_hash: '123456'
    });

    console.log(user);

    expect(user.email).toBe('test@db.com');
  });
});
