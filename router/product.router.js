const express = require('express');

//controller
const { GET_ID_CATALOG, GET, POST, DELETE, UPDATE } = require('../controller/product.controller');

// const
const productRouter = express.Router();

productRouter.route('/api/product').get(GET).post(POST);
productRouter.route('/api/product/:id').delete(DELETE).put(UPDATE).get(GET_ID_CATALOG);
module.exports = productRouter;
