const { User } = require('../../src/app/models');
const factory = require('../factory');
const app = require('../../src/app');
const request = require('supertest');

describe('Test routes', () => {
  it('Should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password_hash: '123456'
    });

    const response = await request(app)
      .post('/auth')
      .send({ email: user.email, password: '123456' });

    expect(response.status).toBe(200);
  });

  it('Should not authenticate', async () => {
    const user = await factory.create('User', {
      password_hash: '123456'
    });

    const response = await request(app)
      .post('/auth')
      .send({ email: user.email, password: '12345678' });

    expect(response.status).toBe(401);
  });

  it('Should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password_hash: '123456'
    });

    const response = await request(app)
      .post('/auth')
      .send({ email: user.email, password: '123456' });

    expect(response.body).toHaveProperty('token');
  });

  it('Should be able to access private route when authenticated', async () => {
    const user = await factory.create('User', {
      password_hash: '123456'
    });

    const response = await request(app)
      .get('/dash')
      .set('Authorization', `Bearer ${user.getToken()}`);

    expect(response.status).toBe(200);
  });

  it('Should not be able to access private route without jwt token', async () => {
    const response = await request(app).get('/dash');

    expect(response.status).toBe(401);
  });

  it('Should not be able to access private route without jwt token', async () => {
    const response = await request(app)
      .get('/dash')
      .set('Authorization', `Bearer 1231213`);

    expect(response.status).toBe(401);
  });
});
