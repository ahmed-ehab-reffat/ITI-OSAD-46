const CustomError = require('../helpers/customError');
const {Products} = require('../models');
const validation = require('../validation');

async function create(data) {
  validation.newProduct(data);
  return await Products.create(data);
}

async function edit(userId, productId, data) {
  validation.id(productId);
  validation.id(userId);
  validation.updateProduct(data);

  const filter = {_id: productId, owner: userId};

  const product = await Products.findOneAndUpdate(filter, data, {
    returnDocument: 'after'
  }).exec();

  if (!product) {
    throw new CustomError({
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Product not found'
    });
  }

  return product;
}

async function remove(userId, productId) {
  validation.id(userId);
  validation.id(productId);
  const filter = {_id: productId, owner: userId};

  const deleteResult = await Products.deleteOne(filter).exec();

  if (deleteResult.deletedCount === 0) {
    throw new CustomError({
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Product not found'
    });
  }

  return deleteResult;
}

async function getProducts(id) {
  validation.id(id);
  return await Products.find({owner: id}).exec();
}

async function getFilteredProducts({status, limit = 10, skip = 0}) {
  const filter = {};

  const queryMap = {
    'available': {$gt: 2},
    'low stock': {$gt: 0, $lte: 2},
    'out of stock': 0
  };

  if (status) {
    const query = queryMap[status];

    if (!query) {
      throw new CustomError({
        statusCode: 422,
        code: 'INVALID_INPUT',
        message: 'Status is invalid'
      });
    }

    filter.quantity = query;
  }

  return await Products.find(filter).limit(limit).skip(skip).exec();
}

module.exports = {
  create,
  edit,
  remove,
  getProducts,
  getFilteredProducts
};
