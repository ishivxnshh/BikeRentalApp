const Joi = require('joi');

module.exports = function aadhaarSchema() {
  return Joi.object({
    aadhaarNumber: Joi.string()
      .pattern(/^[0-9]{12}$/)
      .message('Aadhaar must be 12 digits')
      .required(),
  });
};
