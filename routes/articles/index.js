const express = require('express')
const articleRouter = express.Router()
const {createArticle, updateArticle, getAllArticles, getSingleArticle, deleteArticle} = require('../../controllers/articles')

//endpoint to create an article
articleRouter.post('/article/:userId', createArticle) 

//endpoint to retrieve all articles

articleRouter.get('/articles', getAllArticles)

//endpoint to retrieve an article by Id
 
articleRouter.get('/article/:articleId', getSingleArticle)
//endpoint to update an article
articleRouter.patch('/article/:articleId', updateArticle)

//endpoint to delete an article

articleRouter.delete('/article/:articleId', deleteArticle)

module.exports =   articleRouter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     