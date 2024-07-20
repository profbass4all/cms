const connection = require('../../config/sql')

const deleteArticleModel = (userId)=>{
    return new Promise((resolve, reject) =>{
         connection.query({
            sql: `DELETE FROM articles where userId = ?`,
            values: [userId]
        },(err, res) =>{
            if(err) reject(err);
            resolve(res);
        }
    )
    })
}

const deleteArticlewithArticleId = (articleId)=>{
    return new Promise((resolve, reject) =>{
         connection.query({
            sql: `DELETE FROM articles WHERE articleId = ?`,
            values: [articleId]
        },(err, res) =>{
            if(err) reject(err);
            resolve(res);
        }
    )
    })
}
module.exports ={
    deleteArticleModel,
    deleteArticlewithArticleId
}