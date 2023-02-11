const express = require('express');
const { PUT } = require('../controller/user.controller');
const UserRouter = express.Router();

// container
const { GET, POST, DELETE, UPDATE, GET_ID, LOGIN } = require('../controller/user_bcoin.controller');

UserRouter.route('/api/user_bcoin').get(GET).post(POST);
UserRouter.route('/api/user_bcoin/login').post(LOGIN);
UserRouter.route('/api/user_bcoin/:id').get(GET_ID).delete(DELETE).put(UPDATE);
UserRouter.route('/api/user_bcoin/admin/:id').put(PUT);

module.exports = UserRouter;
