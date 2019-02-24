const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

UserSchema.methods.getToken = function() {
  return jwt.sign({ userId: this._id }, process.env.SECRET_OR_KEY, {
    expiresIn: '5h'
  });
};

module.exports = mongoose.model('User', UserSchema);
