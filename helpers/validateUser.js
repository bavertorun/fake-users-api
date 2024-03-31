const Joi = require("joi")

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        age: Joi.number().required(),
        email: Joi.string().required(),
        phone: Joi.number().integer().required(),
        address: Joi.string().required()
    })
    return schema.validate(user)
}


module.exports = validateUser;