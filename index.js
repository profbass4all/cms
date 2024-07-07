require('dotenv').config()
const express = require('express')
const joi = require('joi')
const app = express()
const port = process.env.PORT 
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');

app.use(express.json())


const mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
})

mysqlConnection.connect((error)=>{
    if(error){
        console.log('not connected')
    }else{
        console.log('connected')
    }
})
app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
    
        })

//user management
// const users =[
//     {
//         firstName: 'Sherifat',
//         lastName: 'Oshoala',
//         userId: 1,
//         dob: '12/06/1990',
//         stateOfOrigin: 'lagos',
//         role: 'user',
//         phoneNo: '08102023380',
//         password: 'sheriprinkle',
//         confirmPassword: 'sheriprinkle',
//         maritalStatus: 'contrived',
//         qualification: 'masters',
//         articles: [],
//         noOfArticles: 0,
//         avatar: 'image',
//     },
//     {
//         firstName: 'Barakat',
//         lastName: 'Asunke',
//         userId: 2,
//         dob: '12/06/1990',
//         stateOfOrigin: 'osun',
//         role: 'user',
//         phoneNo: '08112023380',
//         password: 'sheriprinkle',
//         confirmPassword: 'sheriprinkle',
//         maritalStatus: 'married',
//         qualification: 'ssce',
//         articles: [],
//         noOfArticles: 0,
//         avatar: 'image',
//     },
//     {
//         firstName: 'Tayo',
//         lastName: 'Bakare',
//         userId: 3,
//         dob: '12/06/1990',
//         stateOfOrigin: 'Kwara',
//         role: 'user',
//         phoneNo: '08102024480',
//         password: 'sheriprinkle',
//         confirmPassword: 'sheriprinkle',
//         maritalStatus: 'single',
//         qualification: 'undergraduate',
//         articles: [],
//         noOfArticles: 0,
//         avatar: 'image',
//     },
//     {
//         firstName: 'Bayo',
//         lastName: 'Bakare',
//         userId: 4,
//         dob: '12/06/1990',
//         stateOfOrigin: 'Kwara',
//         role: 'user',
//         phoneNo: '08102024480',
//         password: 'sheriprinkle',
//         confirmPassword: 'sheriprinkle',
//         maritalStatus: 'single',
//         qualification: 'undergraduate',
//         articles: [],
//         noOfArticles: 0,
//         avatar: 'image',
//     },
// ]
//endpoint to create user using joi to validate the input
app.post('/api/user', (request, response)=>{
    try {
        const createUserSchema = joi.object({
        firstName: joi.string().trim().pattern(/^[a-zA-Z]{3,40}$/).min(3).max(40).required().messages({
            "string.min": `"firstName" must be greater {#limit}`,
            "string.max": `"firstName" must be less than {#limit}`,
            "string.empty": `"firstName" cannot be empty`,
            "any.required": `"firsName" is required bro`
        }),
        lastName: joi.string().trim().pattern(/^[a-zA-Z]{3,40}$/).min(3).max(40).required().messages({
            "string.min": `"firstName" must be greater {#limit}`,
            "string.max": `"firstName" must be less than {#limit}`,
            "string.empty": `"firstName" cannot be empty`,
            "any.required": `"firsName" is required bro`
        }),
        dob: joi.string().trim().alphanum().required(),
        currentRole:joi.string().trim().required(),
        currentPassword: joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: joi.ref('currentPassword')
    })
    // .with('password', 'confirmPassword')

    const {error, value} = createUserSchema.validate(request.body)
    const{firstName, lastName, dob, currentPassword, confirmPassword, currentRole} = value
    if(error){
        throw new Error (error.details[0].message)
    }
    mysqlConnection.query(
        {
            sql : `INSERT INTO cms (userId, firstName, lastName, dob, currentPassword, confirmPassword, currentRole) VALUES (?,?,?,?,?, ?,?)`,
            values :[uuidv4(), firstName, lastName, dob, currentPassword, confirmPassword, currentRole]
        },
        (err, result, field) =>{
            if(err){
                console.log(err.message)
            }else{
                console.log(`stuffs added`)
            }
        }
    )
    response.status(201).json({
        message: 'Success',
        status: true,
        data: value
    })

    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})
//endpoint to get all users
app.get('/api/users', (request, response) =>{
    try {
        const {firstName, currentRole} = request.query
        console.log(request.query)

    if(!firstName && !currentRole){
        mysqlConnection.query({
            sql: `SELECT * FROM cms`
        },
        (err, result, fields)=>{
            if(err){
                console.log(err)
            }else{
                response.status(200).json({
                message: 'success',
                status: true,
                data: result
                })
            }
        }
    )
    }else{
        let key = ''
        let val = []
        for(let data in request.query){
            key+= `${data}=? and `
            val.push(request.query[data])
        }
        key = key.slice(0,-4)
        console.log(key)
        mysqlConnection.query({
        sql: `SELECT * FROM cms WHERE ${key}`,
        values: [...val]
        },
        (err, result, fields)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
                response.status(200).json({
                message: 'success',
                status: true,
                data: result
                })
            }
        })
    }   
    
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
    
})


//endpoint to get a single user
app.get('/api/user/:userId', (request, response)=>{
    const {userId} = request.params
    try{
        mysqlConnection.query({
          sql: `SELECT * FROM cms WHERE userId = ?`,
          values: [userId]  
        },
        (err, result, field)=>{
            if(err) console.log(err)
            console.log(result)
        response.status(200).json({
            message:'Successfull',
            status: true,
            data: result
        })
        }
        )
        }catch(error){
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})

//endpoint to update user profile
app.patch('/api/user/:userId', (request, response)=>{
    const {userId} = request.params
    try {
        const updateUserSchema = joi.object({
            firstName: joi.string().trim().pattern(/^[a-zA-Z]{3,40}$/).min(3).max(40).messages({
            "string.min": `"firstName" must be greater {#limit}`,
            "string.max": `"firstName" must be less than {#limit}`,
            "string.empty": `"firstName" cannot be empty`,
            "any.required": `"firsName" is required bro`
        }),
        lastName: joi.string().trim().pattern(/^[a-zA-Z]{3,40}$/).min(3).max(40).messages({
            "string.min": `"firstName" must be greater {#limit}`,
            "string.max": `"firstName" must be less than {#limit}`,
            "string.empty": `"firstName" cannot be empty`,
            "any.required": `"firsName" is required bro`
        }),
        dob: joi.string().trim().alphanum(),
        stateOfOrigin: joi.string().trim().pattern(new RegExp('^[a-zA-Z]$')),
        phoneNo: joi.string().trim().pattern(/^\+\(\d{3}\)-?\d{3} \d{3} \d{4}$/),
        password: joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: joi.ref('password'),
        maritalStatus: joi.string().trim().pattern(/^[a-zA-Z]+$/),
        qualification: joi.string().trim().pattern(/^[a-zA-Z]+$/),
        avatar: joi.binary().encoding('base64').max(100000)
    })
    const {error, value} = updateUserSchema.validate(request.body)
    if(error) throw new Error (error.details[0].message)
    // for(let i = 0; i < users.length; i++){
    //     if(users[i].userId == userId){
    //         users[i] = {...users[i], ...value}
    //     }
    // }
    let key = ''
    let values = []
    for(let data in value){
        key += `${data}=?,`
        values.push(value[data])
        console.log(values)
    }
    
    let updatedKey = key.slice(0, -1)
    console.log(updatedKey)
    mysqlConnection.query({
        sql: `UPDATE cms SET ${updatedKey} WHERE userId = ?`,
        values: [...values, userId]
    },  
       (err, results, fields)=>{
        if(err) throw new Error(err)
            console.log(results)
        response.status(200).json({
        message: 'successful',
        status: true,
        data: results
    })
       } 
)
    
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})

//endpoint to delete user account

app.delete('/api/user/:userId', (request, response) =>{
    try {
        const {userId} = request.params
        for(let i = 0; i < users.length; i++){
            if(users[i].userId == userId && users[i].noOfArticles == 0){
                users.splice(i, 1)
            }
        }
        response.status(200).json({
            message: 'success',
            status: true,
            data: users
        })
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})

const articles = [
    {
        articleId:1,
        userId: 1,
        title: 'The love of my life',
        author: 'zeeky',
        category: 'politics',
        date: new Date('2021-02-12').toDateString(),
        content: "Used to indicate that the next character should NOT be interpreted literally. For examplethe character 'w' by itself will be interpreted as match thecharacter w, but using signifies 'match an alpha-numeric character including underscoreUsed to indicate that a metacharacter is to be interpreted literally. For examplethe '.' metacharacter means 'match any single character but a new line', but if we would rather racter instead, we would use"
    },
    {
        articleId:2,
        userId:2,
        title: 'The love of my Regex',
        author: 'Tawa',
        category: 'comedy',
        date: new Date('2023-04-21').toDateString(),
        content: "Used to indicate that the next character should NOT be interpreted literally. For examplethe character 'w' by itself will be interpreted as match thecharacter w, but using signifies 'match an alpha-numeric character including underscoreUsed to indicate that a metacharacter is to be interpreted literally. For examplethe '.' metacharacter means 'match any single character but a new line', but if we would rather racter instead, we would use",
    }
]
const categories = [
    {
        category: 'comedy',
        count: 2
    },
    {
        category: 'politics',
        count: 7
    }
]
//endpoint to create an article
app.post('/api/article/:userId', (request, response)=>{
    try {
        const {userId} = request.params
        const createArticleSchema = joi.object({
            title: joi.string().trim().required(),
            category: joi.string().trim().required(),
            content: joi.string().trim().max(1000)
        })
        const {error, value} = createArticleSchema.validate(request.body)
        if( error) throw new Error (error.details[0].message)
        const {title, category, content} = value

        // for(let i = 0; i < articles.length; i++){
        //     if(articles[i].title == title && articles[i].author == author){
        //         throw new Error(`You've posted an article with this same title`)
        //     }
        // }
        
        // const getCategory = categories.find(obj => obj.category == category)
        // if(getCategory){
        //     getCategory.count+= 1
        // }else{
        //     categories.push({
        //         category,
        //         count: 1
        //     })
        // }
        // for(let i = 0; i< users.length; i++){
        //     if(users[i].userId == userId){
        //         users[i].articles.push({
        //             articleId: articles.length +1,
        //             title,
        //             author,
        //             category,
        //             date: new Date().toDateString(),
        //             content
        //         })
        //         users[i].noOfArticles = users[i].articles.length
        //     }
        // }
        // articles.push({
        //     userId,
        //     articleId: articles.length +1,
        //     title,
        //     author,
        //     category,
        //     date: new Date().toDateString(),
        //     content
        // })
        mysqlConnection.query({
            sql: `INSERT INTO articles (articleId, userId, title, category, dateOfPosting, content) Values (?,?,?,?,Now(),?)`,
            values: [uuidv4(), userId, title, category, content ]
        },
        (err, result, field)=>{
            if(err){
                console.log(err)
            }else{
                console.log('stuffss added')
                response.status(200).json({
                message: 'success',
                status: true,
                data: value
                })
            }
        }
    
    )
        
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})

//endpoint to retrieve all articles

app.get('/api/articles', (request, response) =>{
    try {
        const {category} = request.query
        console.log(request.query)
        let post = articles
        if(category){
            post = articles.filter(post => post.category == category)
        }

        if(!post) throw new Error(`No article available`)
        if(post.length == 0) throw new Error ('No article available')
mysqlConnection.query({
    sql: `SELECT * FROM articles`
    },
    (err, result, fields)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            response.status(200).json({
        message: 'success',
        status: true,
        data: result
    })
        }
    }
)
        
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
    
})

//endpoint to retrieve an article by Id

app.get('/api/article/:articleId', (request, response)=>{
    try {
        const {articleId} = request.params
        const article = articles.find(article => article.articleId == articleId)
        if(!article) throw new Error(`This article is not available`)
        
        response.status(200).json({
            message: 'success',
            status: true,
            data: article
        })
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})
//endpoint to update an article
    app.patch('/api/article/:articleId', (request, response)=>{
        try {
            const {articleId} = request.params

            const article = articles.find(article => article.articleId == articleId)

            if(!article) throw new Error (`This article is not available`)
            const updateArticleSchema = joi.object({
                title: joi.string().trim().required(),
                author: joi.string().trim().pattern(/^[a-zA-Z]+$/).min(3).max(40).required(),
                category: joi.string().trim().required(),
                content: joi.string().trim().max(1000)
            })

            const {error, value} = updateArticleSchema.validate(request.body)
            if(error) throw new Error (error.details[0].message)
            for(let i = 0; i < articles.length; i++){
            if(articles[i].title == value.title && articles[i].author == value.author){
                throw new Error(`You've posted an article with this same title`)
            }
        }
            for(let i = 0; i < articles.length; i++){
                if(articles[i].articleId == articleId){
                    articles[i] = {...articles[i], ...value}
                }
            }
            response.status(200).json({
                message: 'success',
                status: true,
                data: articles
            })
        } catch (error) {
            response.status(400).json({
            message: error.message,
            status: false
            })
        }
    })

//endpoint to delete a user account

app.delete('/api/article/:articleId', (request, response) =>{
    try {
        const {articleId} = request.params
        for(let i = 0; i < articles.length; i++){
            if(articles[i].articleId == articleId){
                articles.splice(i, 1)
            }
        }
        response.status(200).json({
            message: 'success',
            status: true,
            data: articles
        })
    } catch (error) {
        response.status(400).json({
            message: error.message,
            status: false
        })
    }
})

//endpoint to get the list of categories 
app.get('/api/categories', (request, response)=>{
    try {
        
    response.status(200).json({
        message: 'success',
        status: true,
        data: categories
    })
    } catch (error) {
        response.status(400).json({
            message: 'no category available',
            status: false
        })
    }
    
})