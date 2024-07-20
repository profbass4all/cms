const connection = require('../config/sql')

const getAllCategoriesModel = () => {
    return new Promise((resolve, reject) => {
        connection.query({
            sql: `SELECT category from categories`
        },
        (err, result) =>{
            if(err){
                rehect(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports = getAllCategoriesModel