const validate = (schema) => {
  return (req, res, next) => {
    const options = { abortEarly: true, allowUnknown: false };
    const { error } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = validate;
