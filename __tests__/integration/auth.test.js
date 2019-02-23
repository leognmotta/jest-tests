const { User } = require('../../src/app/models');
const app = require('../../src/app');
const request = require('supertest');

describe('Test routes', () => {
  it('Test authenticate', async () => {
    const user = await User.create({
      name: 'Leo',
      email: 'test2@test.com',
      password_hash: '123456'
    });

    const response = await request(app)
      .post('/auth')
      .send({ email: user.email, password_hash: '123456' });

    expect(response.status).toBe(200);
  });
});
