const CustomError = require('../helpers/customError');

function id(id) {
  if (!id || id.length !== 24 || !/^[0-9a-f]{24}$/i.test(id)) {
    throw new CustomError({
      statusCode: 422,
      code: 'INVALID_ID',
      message: 'Invalid ID'
    });
  }
}

module.exports = id;
