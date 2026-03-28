// this is for schema validation (if some parameter such as description ,title or location is missing)
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null).default("https://images.unsplash.com/photo-1505693416388-ac5ce068fe85")
    }).required()
    
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});
