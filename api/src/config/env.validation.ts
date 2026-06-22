import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
});