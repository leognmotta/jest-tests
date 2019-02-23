const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password_hash: {
    type: String
  }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password_hash') || this.isNew) {
    const hash = await bcrypt.hash(this.password_hash, 10);
    this.password_hash = hash;
  }

  next();
});

module.exports = mongoose.model('User', UserSchema);
