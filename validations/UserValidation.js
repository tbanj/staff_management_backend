const joi = require('joi');
exports.RegisterUserValidator = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.required()
};
exports.LoginUserValidator = {
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.required()
};