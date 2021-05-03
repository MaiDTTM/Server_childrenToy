const express = require('express');

// container
const { GET, POST, DELETE, UPDATE, GET_ID, LOGIN } = require('../controller/transaction.controller');
// const
const transactionRouter = express.Router();
transactionRouter.route('/api/transaction').get(GET).post(POST);
transactionRouter.route('/api/transaction/:id').get(GET_ID).put(UPDATE);

module.exports = transactionRouter;
