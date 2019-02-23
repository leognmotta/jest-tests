const request = require('supertest');
const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const app = require('../../src/app');

describe('Will test user models', () => {
  it('Should encrypt user password', async () => {
    const user = await User.create({
      nome: 'Leonardo',
      email: 'leo@dombosco.com',
      password_hash: '123456'
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
