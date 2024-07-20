const express = require('express');
const categoryRouter = express.Router();
const getAllCategories = require('../../controllers/categories')


//endpoint to get the list of categories 
categoryRouter.get('/categories', getAllCategories)

module.exports = categoryRouter;