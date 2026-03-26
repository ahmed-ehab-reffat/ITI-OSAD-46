function isValidString(value) {
  return value && value.trim().length > 0;
}

function isValidNumber(value) {
  value = Number(value);
  return value && !isNaN(value) && value > 0;
}

module.exports = {
  isValidNumber,
  isValidString,
};
