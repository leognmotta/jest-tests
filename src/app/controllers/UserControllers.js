class UserController {
  test(req, res, next) {
    return res.status(200).send('Hello');
  }
}

module.exports = new UserController();
