const getAllCategoriesModel = require('../../models/category')

const getAllCategories =async (request, response)=>{
    try {
        const categories = await getAllCategoriesModel()
        response.status(200).json({
            message: 'categories available',
            status: true,
            data: categories
        })
    
    } catch (error) {
        response.status(400).json({
            message: 'no category available',
            status: false
        })
    }
    
}


module.exports = getAllCategories;