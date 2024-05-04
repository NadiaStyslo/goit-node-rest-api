import Joi from 'joi';
const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userRegisterSchema = Joi.object({
  email: Joi.string().email().pattern(emailValid).required(),
  password: Joi.string().min(6).required(),
});
export const userLoginInSchema = Joi.object({
  email: Joi.string().email().pattern(emailValid).required(),
  password: Joi.string().min(6).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().email().pattern(emailValid).required(),
});
