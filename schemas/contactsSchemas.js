import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateContactSchema = Joi.object({});
