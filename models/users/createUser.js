const mysqlConnection = require('../../config/sql');    

const isUserAvailableModel = ({email})=>{
    return new Promise((resolve, reject) => {
        mysqlConnection.query({
            sql: `SELECT * FROM users WHERE email =?`,
            values: [email]
        }, (err, result) =>{
            if(err) reject(err)
                resolve(result)
        }
    )
    })
}

const createUserModel = (uuid, request)=>{
    const{firstName, lastName, email, dob, currentPassword, confirmPassword, currentRole} = request
    return new Promise((resolve, reject) => {
        mysqlConnection.query(
        {
            sql : `INSERT INTO users (userId, firstName, lastName,email, dob, currentPassword, confirmPassword, currentRole) VALUES (?,?,?,?,?,?, ?,?)`,
            values :[uuid, firstName, lastName,email, dob, currentPassword, confirmPassword, currentRole]
        },
        (err, result) =>{
            if(err){
                reject(err)
            }else{
               resolve(result)
            }
        }
    )
    })
}
module.exports = {createUserModel, isUserAvailableModel};