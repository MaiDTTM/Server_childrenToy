const express = require('express');
const BlockRouter = express.Router();

// container
const { POST, GET } = require('../controller/block.controller');

BlockRouter.route('/api/blockchain').post(POST).get(GET);
// UserRouter.route('/api/blockchain-transaction').post(POST);

module.exports = BlockRouter;
