const joi = require('joi');
exports.CreateStaffValidator = {
  fullName: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  dob: joi.date().required(),
  stateOfOrigin: joi.string().required(),
};
