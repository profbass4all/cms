const connection  = require('../../config/sql')

const getAllUser = ()=>{
    return new Promise((resolve, reject)=>{
        connection.query({
            sql: `SELECT * FROM users`
        },
        (err, result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        }
    )
    });
}

const getUsersByQuery = (key, val)=>{ 
    console.log(key, val)
    return new Promise((resolve, reject)=>{
        connection.query({
        sql: `SELECT * FROM users WHERE ${key}`,
        values: [...val]
        },
        
        (err, result, fields)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

module.exports = {getAllUser, getUsersByQuery}