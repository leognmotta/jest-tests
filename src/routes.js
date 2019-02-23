const routes = require('express').Router();

const UserController = require('./app/controllers/UserControllers');

routes.get('/', UserController.test);

module.exports = routes;
