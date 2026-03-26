const CustomError = require('../helpers/customError');

const userValidationRules = {
  username: {type: 'string', minLength: 8, maxLength: 20, required: true},
  password: {type: 'string', required: true},
  firstName: {type: 'string', minLength: 3, maxLength: 15, required: true},
  lastName: {type: 'string', minLength: 3, maxLength: 15, required: true},
  dob: {type: 'date', required: true}
};

const validators = {
  string: (field, value, rules) => {
    if (rules.minLength && value.length < rules.minLength)
      return `${field} must be at least ${rules.minLength} characters`;
    if (rules.maxLength && value.length > rules.maxLength)
      return `${field} must not exceed ${rules.maxLength} characters`;
    return null;
  },
  date: (field, value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return `${field} must be a valid date`;
    if (date > new Date()) return `${field} cannot be in the future`;
    return null;
  }
};

function validateField(field, value, rules, isUpdate) {
  if (value === undefined || value === null) {
    return !isUpdate && rules.required ? `${field} is required` : null;
  }

  if (rules.type === 'string' && typeof value !== 'string') {
    return `${field} must be a string`;
  }

  const typeValidator = validators[rules.type];
  return typeValidator ? typeValidator(field, value, rules) : null;
}

function validateUserData(data, isUpdate = false) {
  const errors = {};

  for (const [field, rules] of Object.entries(userValidationRules)) {
    const value = data[field];
    const error = validateField(field, value, rules, isUpdate);

    if (error) {
      errors[field] = error;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new CustomError({
      statusCode: 422,
      code: 'VALIDATION_ERROR',
      message: `User validation failed: ${Object.values(errors).join('; ')}`,
      errors
    });
  }

  return data;
}

const newUser = (data) => validateUserData(data, false);
const updateUser = (data) => validateUserData(data, true);

module.exports = {
  newUser,
  updateUser
};
