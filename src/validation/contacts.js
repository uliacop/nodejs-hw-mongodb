import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'Contact name is required',
  }),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().min(3),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  userId: Joi.string(),
  photo: Joi.string(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  phoneNumber: Joi.string(),
  email: Joi.string().email().min(3),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  photo: Joi.string(),
});
