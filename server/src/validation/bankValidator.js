const Joi = require('joi');

module.exports = function bankSchema() {
  return Joi.object({
    bankAccount: Joi.string()
      .pattern(/^[0-9]{8,18}$/)
      .message('Bank account must be between 8 and 18 digits')
      .required(),
    ifscCode: Joi.string()
      .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
      .message('IFSC must be in format: AAAA0AAAAAA')
      .required(),
  });
};
