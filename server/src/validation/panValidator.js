const Joi = require('joi');

module.exports = function panSchema() {
  return Joi.object({
    panNumber: Joi.string()
      .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
      .message('PAN must be in format: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)')
      .required(),
  });
};
