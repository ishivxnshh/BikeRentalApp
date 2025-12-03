const Joi = require('joi');

module.exports = function dlSchema() {
  return Joi.object({
    dlNumber: Joi.string()
      .min(8)
      .message('Driving license number must be at least 8 characters')
      .required(),
  });
};
