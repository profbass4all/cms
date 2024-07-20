const connection = require('../../config/sql')

const getArticlesModel = ()=>{
    return new Promise((resolve, reject) =>{
        connection.query({
        sql: `SELECT * FROM articles`
        },
        (err, result)=>{
        if(err){
            reject(err)
        }else{
            resolve(result)
        }
    }
)
    })
}

const getQueriedArticleModel = ({category})=>{
    return new Promise((resolve, reject)=>{
        connection.query({
        sql: `SELECT * FROM articles WHERE category =?`,
        values: [category]
    },(err, result)=>{
            if(err) reject(err)
            else resolve(result)
        }
    
)
    })
}

const getSingleArticleModel = (articleId)=>{
    return new Promise((resolve, reject)=>{
         connection.query({
            sql: `SELECT * FROM articles WHERE articleId =?`,
            values: [articleId]
        }, (err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        }
    )
    })   
}
module.exports = {
    getArticlesModel,
    getQueriedArticleModel,
    getSingleArticleModel
}