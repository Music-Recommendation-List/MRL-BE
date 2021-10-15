const Joi = require('joi');

const signSchema = Joi.object({
  userId: Joi.string()
    .min(3)
    .regex(/^[0-9a-z]+$/i)
    .required(),
  password: Joi.string().min(4).required(),
  passwordConfirm: Joi.string().min(4).required(),
});

module.exports = signSchema;