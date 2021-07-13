const express = require('express');

//controller
const { GET, POST, DELETE } = require('../controller/comments.controller');

// const
const commentsRouter = express.Router();

commentsRouter.route('/api/comment').get(GET).post(POST);
commentsRouter.route('/api/comment/:id').delete(DELETE);
module.exports = commentsRouter;
