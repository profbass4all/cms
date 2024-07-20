const express = require('express')
const userRouter = express.Router()
const {createUser, getAllUsers, getSingleUser, updateUser, deleteUser} = require('../../controllers/users')


//endpoint to create user using joi to validate the input
userRouter.post('/user', createUser)
//endpoint to get all users
userRouter.get('/users', getAllUsers)

//endpoint to get a single user
userRouter.get('/user/:userId', getSingleUser)

//endpoint to update user profile
userRouter.patch('/user/:userId',updateUser)

//endpoint to delete user account

userRouter.delete('/user/:userId', deleteUser)




module.exports = userRouter