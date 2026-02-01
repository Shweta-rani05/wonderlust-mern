// this is for schema validation (if some parameter such as description ,title or location is missing)
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    lisdting:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.string().required().min(0),
        image:Joi.string().allow("",null)
    }).required()
    
});
