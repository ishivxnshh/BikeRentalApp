const Joi = require('joi');

module.exports = {
  registerSchema: function () {
    return Joi.object({
      name: Joi.string().trim().min(2).required(),
      phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .message('Phone must be 10 digits')
        .required(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).required(),
    });
  },

  loginSchema: function () {
    return Joi.object({
      phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .message('Phone must be 10 digits')
        .required(),
      password: Joi.string().min(6).required(),
    });
  },
};
