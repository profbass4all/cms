const joi = require('joi')


const validateUser = (data) => {

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
        email:joi.string().email().required(),
        dob: joi.string().trim().alphanum().required(),
        currentRole:joi.string().trim().required(),
        currentPassword: joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: joi.ref('currentPassword')
    })
    .with('password', 'confirmPassword')

    const {error} = createUserSchema.validate(data)
    return error
}

const validateUpdate = (data)=>{
    const updateUserSchema = joi.object({
            firstName: joi.string().trim().pattern(/^[a-zA-Z]{3,40}$/).min(3).max(40).messages({
            "string.min": `"firstName" must be greater {#limit}`,
            "string.max": `"firstName" must be less than {#limit}`,
            "string.empty": `"firstName" cannot be empty`
        }),
        lastName: joi.string().trim().pattern(/^[a-zA-Z]{3,40}$/).min(3).max(40).messages({
            "string.min": `"firstName" must be greater {#limit}`,
            "string.max": `"firstName" must be less than {#limit}`,
            "string.empty": `"firstName" cannot be empty`
        }),
        email:joi.string().email().required(),
        dob: joi.string().trim().alphanum(),
        stateOfOrigin: joi.string().trim().pattern(new RegExp('^[a-zA-Z]$')),
        phoneNo: joi.string().trim().pattern(/^\+\(\d{3}\)-?\d{3} \d{3} \d{4}$/),
        password: joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: joi.ref('password'),
        maritalStatus: joi.string().trim().pattern(/^[a-zA-Z]+$/),
        qualification: joi.string().trim().pattern(/^[a-zA-Z]+$/),
        avatar: joi.binary().encoding('base64').max(100000)
    })
    const {error} = updateUserSchema.validate(data)
    return error
}

module.exports = {
    validateUser,
    validateUpdate
}
