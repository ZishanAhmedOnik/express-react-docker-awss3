const Joi = require('joi');

const authSchema = Joi.object({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(), //min len for dev purpose, will be updated in production
    confirmPassword: Joi.ref('password')
})

module.exports = {
    authSchema
}