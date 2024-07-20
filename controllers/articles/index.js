const {deleteArticlewithArticleId} = require('../../models/articles/deleteArticle')
const {validateArticle, validateUpdatingArticle} = require('../../validations/articles')
const {insertCategory,checkCategory, isTitle, updateNoofArticles, insertArticleModel} = require('../../models/articles/createArticles')
const updateArticleModel = require('../../models/articles/updateArticleModel')
const {getArticlesModel, getQueriedArticleModel,getSingleArticleModel } =  require('../../models/articles/getArticlesModel')




const createArticle =async (request, response)=>{
    try {
        const {userId} = request.params
        const {error} = validateArticle(request.body)

        if( error != undefined) throw new Error (error.details[0].message)

        const isTitleAvailable = await isTitle(request.body, userId)

        if( isTitleAvailable > 0) throw new Error (`request.body.title has been posted by you`)
        
        const isCategory = await checkCategory(request.body)

        if( isCategory == 0) await insertCategory(request.body)

        await insertArticleModel(request.body, userId)
        
        await updateNoofArticles(userId)
        response.status(200).json({
            message: "Article posted successfully",
            status: false,
        })
    
} catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
}

const updateArticle =async (request, response)=>{
        try {
            const {articleId} = request.params

        const isValidateUpdatingArticle = validateUpdatingArticle(request.body)

        if(isValidateUpdatingArticle != undefined) throw new Error (error.details[0].message)

            let key = ''
            let val = []
            for(let data in request.body){
                key += `${data} = ?, `
                val.push(request.body[data])
            }
            key= key.slice(0, -2)
            console.log(key)
            
        const newArticle = await updateArticleModel(val, key, articleId)
        response.status(200).json({
            message: 'Updated article',
            status: 'OK',
            data: newArticle
        })
        } catch (error) {
            console.log(error)
            response.status(400).json({
            message: error.message,
            status: false
            })
        }
}

const getAllArticles =async (request, response) =>{
    try {
        
    if(Object.keys(request.query).length == 0){
        const allArticles = await getArticlesModel()
        response.status(200).json({
            message: 'success',
            status: true,
            data: allArticles
        }) 
    }else{
    
    const getSingleArticle = await getQueriedArticleModel(request.query)
    if(getSingleArticle.length == 0){
        response.status(200).json({
            message: 'No articles',
            status: true
        })
    }else{
        response.status(200).json({
        message: 'Articles available',
        status: true,
        data: getSingleArticle
    })
    }
    
}} catch (error) {
        response.status(404).json({
            message: 'message',
            status: false
        })
    }
    
}

const getSingleArticle =async (request, response)=>{
    try {
       const {articleId} = request.params
       console.log(articleId)
       const getSingle = await getSingleArticleModel(articleId)
        response.status(200).json({
            message:"success",
            status: true,
            data: getSingle
        })
    } catch (error) {
        console.log(articleId)
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
}

const deleteArticle =async (request, response) =>{
    try {
        const {articleId} = request.params
        await deleteArticlewithArticleId(articleId)
        response.status(200).json({
            message: 'article deleted successfully',
            status: true,
        })
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
}



module.exports = {
    createArticle,
    updateArticle,
    getAllArticles,
    getSingleArticle,
    deleteArticle
}