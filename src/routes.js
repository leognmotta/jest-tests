const routes = require('express').Router();

const isAuth = require('./app/middlewares/isAuth');

const UserController = require('./app/controllers/UserControllers');
const AuthController = require('./app/controllers/AuthController');

routes.get('/', UserController.test);

routes.post('/auth', AuthController.authenticate);

routes.use(isAuth);

routes.get('/dash', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
