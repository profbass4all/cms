const connection  = require('../../config/sql');
const getSingleUserModel = (userId) =>{
    return new Promise((resolve, reject) => {
        connection.query({
          sql: `SELECT * FROM users WHERE userId = ?`,
          values: [userId]  
        },
        (err, res) =>{
            if(err) reject(err);
            resolve(res);
        }
)
    })
}

module.exports = {
    getSingleUserModel
}