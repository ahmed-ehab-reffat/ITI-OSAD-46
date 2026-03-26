const express = require('express');
const {productsController} = require('../controllers');
const asyncWrapper = require('../helpers/asyncWrapper');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {body} = req;
  const [error, product] = await asyncWrapper(productsController.create(body));

  if (!error) {
    return res.status(201).json(product);
  }

  next(error);
});

router.get('/', async (req, res, next) => {
  const [error, products] = await asyncWrapper(
    productsController.getFilteredProducts(req.query)
  );

  if (!error) {
    return res.status(200).json(products);
  }

  next(error);
});

router.patch('/:id', async (req, res, next) => {
  const productId = req.params.id;
  const {userId, ...data} = req.body;

  const [error, product] = await asyncWrapper(
    productsController.edit(userId, productId, data)
  );

  if (!error) {
    return res
      .status(201)
      .json({message: 'Product was edited successfully', product});
  }

  next(error);
});

router.delete('/:id', async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.body.userId;
  const [error, deleteResult] = await asyncWrapper(
    productsController.remove(userId, productId)
  );

  if (!error) {
    return res.status(201).json(deleteResult);
  }

  next(error);
});

module.exports = router;
