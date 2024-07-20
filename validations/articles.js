const joi = require('joi');

const validateArticle = (data)=>{
    const createArticleSchema = joi.object({
            title: joi.string().trim().required(),
            category: joi.string().trim().required(),
            content: joi.string().trim().max(1000)
        })

        return createArticleSchema.validate(data);

}
const validateUpdatingArticle = (data) => {
    const updateArticleSchema = joi.object({
                title: joi.string().trim(),
                category: joi.string().trim(),
                content: joi.string().trim().max(1000)
            })

    const {error} = updateArticleSchema.validate(data)
    return error
}
module.exports = {validateArticle, validateUpdatingArticle}