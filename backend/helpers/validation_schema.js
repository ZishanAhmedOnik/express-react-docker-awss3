const Joi = require('joi');

const registerSchema = Joi.object({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(), //min len for dev purpose, will be updated in production
    confirmPassword: Joi.ref('password')
})

const loginSchema = Joi.object({
    emailOrUserName: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    registerSchema,
    loginSchema
}