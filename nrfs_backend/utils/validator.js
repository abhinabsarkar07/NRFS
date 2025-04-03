const Joi = require('joi');

const seatValidator = Joi.object({
  row_number: Joi.number().required(),
  seat_number: Joi.number().required(),
});

module.exports = { seatValidator };
