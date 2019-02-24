const request = require('supertest');
const factory = require('../factory');
const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const app = require('../../src/app');

describe('Will test user models', () => {
  it('Should hash user password', async () => {
    await factory.create('User', {
      password_hash: '123456',
      email: 'leo@dombosco.com'
    });

    const user = await User.findOne({ email: 'leo@dombosco.com' });

    const compareHash = await user.checkPassword('123456');

    expect(compareHash).toBe(true);
  });
});
