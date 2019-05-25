'use strict';

const Joi = require('joi');
const create_schema = Joi.object().keys({
  message: Joi.string().required(),
  time: Joi.number().integer().min(0).required()
});

module.exports = {
  create: create_schema,
};
