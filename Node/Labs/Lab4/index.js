const process = require('node:process');
const express = require('express');
const mongoose = require('mongoose');
const CustomError = require('./helpers/customError');
const routes = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/node-lab4');

const app = express();
app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({code: err.code, message: err.message});
  }

  res.status(501).json({error: err.message});
});

module.exports = app;

const PORT = process.env.PORT || '3000';

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Up and running: http://127.0.0.1:${PORT}`);
});

// Restock or destock product using {operation: “restock”
// or “destock”, quantity: number}
// Users validation
