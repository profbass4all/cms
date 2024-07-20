const connection = require('../../config/sql')

const isUserAvailable = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query({
            sql: `SELECT * FROM users WHERE userId = ?`,
            values: [userId]
        }, (err, result) =>{
            if(err) reject(err)
                resolve(result)
        }
    )
    })
}

const deleteUserModel = (userId)=>{
    return new Promise((resolve, reject) =>{
         connection.query({
            sql: `DELETE FROM users WHERE userId = ?`,
            values: [userId]
        },
        (err, res) =>{
            if(err) reject(err);
            resolve(res);
        }
        
    )
    })
}

module.exports ={
    deleteUserModel,
    isUserAvailable
}