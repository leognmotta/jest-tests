const { User } = require('../../src/app/models');
const app = require('../../src/app');
const request = require('supertest');

describe('Creating documents', () => {
  it('creates a user', async () => {
    const user = await User.create({
      name: 'Leo',
      email: 'test2@test.com',
      password_hash: '123456'
    });

    expect(user.email).toBe('test2@test.com');
  });

  it('Test express route', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});
