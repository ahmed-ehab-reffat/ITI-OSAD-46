const express = require('express');
const {usersController, productsController} = require('../controllers');
const asyncWrapper = require('../helpers/asyncWrapper');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {body} = req;
  const [error, user] = await asyncWrapper(usersController.create(body));

  if (!error) {
    return res.status(201).json(user);
  }

  next(error);
});

router.get('/', async (req, res, next) => {
  const [error, users] = await asyncWrapper(usersController.getAll());

  if (!error) {
    return res.json(users);
  }

  next(error);
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  const [error, DeleteResult] = await asyncWrapper(
    usersController.deleteByID(id)
  );

  if (!error) {
    return res.status(201).json(DeleteResult);
  }

  next(error);
});

router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const {body} = req;
  const [error, user] = await asyncWrapper(usersController.edit(id, body));

  if (!error) {
    return res
      .status(201)
      .json({message: 'user was edited successfully', user});
  }

  next(error);
});

router.get('/:id/products', async (req, res, next) => {
  const id = req.params.id;
  const [error, products] = await asyncWrapper(
    productsController.getProducts(id)
  );

  if (!error) {
    return res.status(201).json(products);
  }

  next(error);
});

module.exports = router;
