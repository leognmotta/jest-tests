const { User } = require('../models');

class AuthController {
  async authenticate(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect Password' });
    }

    return res.status(200).json({ user: user, token: user.getToken() });
  }
}

module.exports = new AuthController();
