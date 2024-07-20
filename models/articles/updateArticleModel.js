const connection  = require('../../config/sql');

const updateArticleModel = (val, key, articleId)=>{
    return new Promise((resolve, reject) => {
        connection.query({
                sql: `UPDATE articles SET ${key} WHERE articleId = ?`,
                values: [...val, articleId]
            },
            (err, results)=>{
                if(err) reject(err);
                resolve (results);
            }
        )
    })  
}

module.exports = updateArticleModel