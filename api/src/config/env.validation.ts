import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGODB_URI: Joi.string().required(),
  TELEGRAM_BOT_USERNAME: Joi.string().required(),
});