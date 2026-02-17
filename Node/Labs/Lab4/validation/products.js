const CustomError = require('../helpers/customError');
const id = require('./id');

const productValidationRules = {
  name: {type: 'string', minLength: 5, maxLength: 20, required: true},
  quantity: {type: 'number', min: 0, required: true},
  owner: {type: 'string', required: true, customValidator: id},
  categories: {type: 'array', required: false}
};

const validators = {
  string: (field, value, rules) => {
    if (rules.minLength && value.length < rules.minLength)
      return `${field} must be at least ${rules.minLength} characters`;
    if (rules.maxLength && value.length > rules.maxLength)
      return `${field} must not exceed ${rules.maxLength} characters`;
    return null;
  },
  number: (field, value, rules) => {
    if (rules.min !== undefined && value < rules.min)
      return `${field} must be at least ${rules.min}`;
    if (rules.max !== undefined && value > rules.max)
      return `${field} must not exceed ${rules.max}`;
    return null;
  },
  array: (field, value) => {
    if (!Array.isArray(value)) return `${field} must be an array`;
    return null;
  }
};

function validateField(field, value, rules, isUpdate) {
  if (value === undefined || value === null) {
    return !isUpdate && rules.required ? `${field} is required` : null;
  }

  const actualType = Array.isArray(value) ? 'array' : typeof value;
  if (actualType !== rules.type) {
    return `${field} must be a ${rules.type}`;
  }

  // Run custom validator if provided
  if (rules.customValidator) {
    return rules.customValidator(value);
  }

  const typeValidator = validators[rules.type];
  return typeValidator ? typeValidator(field, value, rules) : null;
}

function validateProductData(data, isUpdate = false) {
  const errors = {};

  for (const [field, rules] of Object.entries(productValidationRules)) {
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
      message: `Validation failed: ${Object.values(errors).join('; ')}`,
      errors
    });
  }

  return data;
}

const newProduct = (data) => validateProductData(data, false);
const updateProduct = (data) => validateProductData(data, true);

module.exports = {
  newProduct,
  updateProduct
};
