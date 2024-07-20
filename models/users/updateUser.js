const connection = require('../../config/sql')

const updateUserModel = (updatedKey, values, userId)=>{
    return new Promise((resolve, reject) => {
        connection.query({
        sql: `UPDATE users SET ${updatedKey} WHERE userId = ?`,
        values: [...values, userId]
    },  
       (err, results)=>{
        if(err) reject(err)
            resolve(results)
          
       } 
)
    })
}
module.exports = updateUserModel