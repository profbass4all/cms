const connection = require('../../config/sql');
const { v4: uuidv4 } = require('uuid');

const checkCategory =({category}) => {
    return new Promise((resolve, reject) => {
        connection.query({
            sql: `SELECT category FROM categories WHERE category = ?`,
            values: [category]
        },
        (err, res) => {
            if(err) reject(err);
            resolve(res);
        }
    )
    })
}

const insertCategory = ({category})=>{
    return new Promise((resolve, reject)=>{
        connection.query({
            sql: `INSERT INTO categories(category_id, category) values(?, ?)`,
            values: [uuidv4(), category]
        },
        (err, result, field)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }    
        }   
        )
    })
}

const isTitle = ({title}, userId)=>{
    return new Promise((resolve, reject)=>{
        connection.query({
            sql: `SELECT * FROM articles WHERE title = ? AND userId = ?`,
            values: [title, userId]
        },
        (err, res)=>{
            if(err) reject(err)
                resolve(res)
        }
    )
    })
}

const insertArticleModel = ({ title, category,content}, userId)=>{
    return new Promise((resolve, reject)=>{
        connection.query({
            sql: `INSERT INTO articles (articleId, userId, title, category, dateOfPosting, content) values (?,?,?, ?,Now(),?)`,
            values: [uuidv4(), userId, title, category, content ]
        },(err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

const updateNoofArticles = (userId)=>{
    return new Promise((resolve, reject)=>{
        connection.query({
            sql: `UPDATE users SET noOfArticles = (select count(*) from articles where userId = ?) where userId = ?`,
            values: [userId, userId]
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


module.exports = {
    checkCategory,
    insertCategory,
    isTitle,
    insertArticleModel,
    updateNoofArticles
}