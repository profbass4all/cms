const messages = require('../../messages')
const {validateUser, validateUpdate} = require('../../validations/users')
const { v4: uuidv4 } = require('uuid');
const {createUserModel, isUserAvailableModel} = require('../../models/users/createUser');
const {getAllUser, getUsersByQuery} = require('../../models/users/getAllUsers');
const {getSingleUserModel} = require('../../models/users/getSingleUser');
const updateUserModel = require('../../models/users/updateUser');
const {deleteArticleModel} = require('../../models/articles/deleteArticle');  
const {deleteUserModel, isUserAvailable } = require('../../models/users/deleteUser');

const createUser = async (request, response)=>{
        try {
            const error = validateUser(request.body)
        if(error != undefined) throw new Error(error.details[0].message)
    const isUserAvailable =await isUserAvailableModel(request.body)
    if(isUserAvailable.length > 0) throw new Error('You have already registered') 
    await createUserModel(uuidv4(), request.body)
    
        return response.status(200).json({
            message: messages.createUser, 
            status: true,
            data: 'User created successfully'
        })
        } catch (error) {
            response.status(400).json({
            message: error.message,
            status: false
            })
        }
}

const getAllUsers = async (request, response) =>{
    try {
        if(Object.keys(request.query).length == 0){
            const users = await getAllUser()
            response.status(200).json({
                message: 'success',
                status: true,
                data: users
                })
        
    }else if(Object.values(request.query).length > 0){
        let key = ''
        let val = []
        for(let data in request.query){
            key+= `${data}=? and `
            val.push(request.query[data])
        }
        key = key.slice(0,-4)
        const getUserViaquery = await getUsersByQuery(key, val)
        response.status(200).json({
            message: 'success',
            status: true,
            data: getUserViaquery
            })
    }   
    
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
    
}

const getSingleUser = async (request, response)=>{
    const {userId} = request.params
    try{
        const getSingle = await getSingleUserModel(userId)
        response.status(200).json({
            message: 'Success',
            status: true,
            data: getSingle
        })
        }catch(error){
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
}

const updateUser = async (request, response)=>{
    const {userId} = request.params
    try {
    const validateUser = validateUpdate(request.body)
    if(validateUser != undefined){
        throw new Error(error.details[0].message)
    }

    let key = ''
    let values = []
    for(let data in request.body){
        key += `${data}=?,`
        values.push(request.body[data])
    }
    
    let updatedKey = key.slice(0, -1)
    
    const updatedUser = await updateUserModel(updatedKey, values, userId)
    response.status(200).json({
        message: updatedUser,
        status: 'success',
    })
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
}

const deleteUser =async  (request, response) =>{
    try {
        const {userId} = request.params
    
        const isUser = await isUserAvailable(userId)
        if(isUser.length === 0) throw new Error(`This user is not available or has been deleted`)
        await deleteArticleModel(userId)
        await deleteUserModel(userId)
        response.status(200).json({
            status: 'success',
            message: 'user deleted successfully'
        })
        
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}