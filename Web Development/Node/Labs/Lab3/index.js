const express = require('express');
const path = require('path');
const model = require('./models');
const {isValidNumber, isValidString} = require('./validation');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const inventory = model.getInventory();
  res.render('index', {inventory});
});

app.get('/products', (req, res) => {
  const inventory = model.getInventory();
  res.json(inventory);
});

app.get(
  '/products/:id',
  (req, res, next) => {
    let id = req.params.id;
    id = Number(id);

    if (isValidNumber(id)) {
      req.body = {id};
      return next();
    }

    res.status(422).json({message: 'ID is not valid'});
  },
  (req, res, next) => {
    const {id} = req.body;
    const item = model.getItem(id);

    if (item) {
      req.body.item = item;
      return next();
    }

    res.status(404).json({message: 'Item not found'});
  },
  (req, res) => {
    res.json(req.body.item);
  }
);

app.post(
  '/products',
  (req, res, next) => {
    let {name, quantity, category} = req.body;
    name = name.trim();
    category = category.trim();
    quantity = Number(quantity);

    if (
      isValidString(name) &&
      isValidString(category) &&
      isValidNumber(quantity)
    ) {
      req.body = {name, quantity, category};
      return next();
    }

    res.status(422).send({message: 'Invalid input'});
  },
  (req, res, next) => {
    const {name, quantity, category} = req.body;

    const addedItem = model.addItem(name, quantity, category);

    if (addedItem) {
      return next();
    }

    res.status(500).send({message: 'Failed to add item'});
  },
  (req, res) => {
    res.status(201).send(`Item ${req.body.name} added successfully`);
  }
);

app.delete(
  '/products/:id',
  (req, res, next) => {
    let id = req.params.id;
    id = Number(id);

    if (isValidNumber(id)) {
      req.body = {id};
      return next();
    }

    res.status(422).json({message: 'ID is not valid'});
  },
  (req, res, next) => {
    const deletedItem = model.removeItem(req.body.id);

    if (deletedItem) {
      req.body.deletedItem = deletedItem;
      return next();
    }

    res.status(404).json({message: 'Item not found'});
  },
  (req, res) => {
    res.status(200).json(req.body.deletedItem);
  }
);

app.patch(
  '/products/:id/restock',
  (req, res, next) => {
    let id = req.params.id;
    let amount = req.body.amount;

    id = Number(id);
    amount = Number(amount);

    if (isValidNumber(id) && isValidNumber(amount)) {
      req.body = {id, amount};
      return next();
    }

    res.status(422).send({message: 'Invalid input'});
  },
  (req, res, next) => {
    const {id, amount} = req.body;
    const success = model.restockItem(id, amount);

    if (success) {
      return next();
    }
    res.status(404).send('Item not found');
  },
  (req, res) => {
    res.status(200).json({message: `Item restocked by ${req.body.amount}`});
  }
);

app.patch(
  '/products/:id/destock',
  (req, res, next) => {
    let id = req.params.id;
    let amount = req.body.amount;

    id = Number(id);
    amount = Number(amount);

    if (isValidNumber(id) && isValidNumber(amount)) {
      req.body = {id, amount};
      return next();
    }

    res.status(422).send({message: 'Invalid input'});
  },
  (req, res, next) => {
    const {id, amount} = req.body;
    const success = model.destockItem(id, amount);

    if (success) {
      return next();
    }

    res.status(404).send('Item not found');
  },
  (req, res) => {
    res.status(200).json({message: `Item destocked by ${req.body.amount}`});
  }
);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
});

app.listen(3000);
