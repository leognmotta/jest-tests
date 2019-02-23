const routes = require('express').Router();

const UserController = require('./app/controllers/UserControllers');
const AuthController = require('./app/controllers/AuthController');

routes.get('/', UserController.test);

routes.post('/auth', AuthController.authenticate);

module.exports = routes;
