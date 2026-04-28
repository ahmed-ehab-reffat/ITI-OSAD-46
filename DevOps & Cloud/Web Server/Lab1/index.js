const express = require('express');
const routes = require('./routes');
const {CustomError} = require('./utils');

const app = express();

app.use(express.json());

app.use(routes);

app.use((error, req, res, _) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      error: error.message,
      code: error.code
    });
  }

  console.error('Unexpected error:', error);
  return res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    _links: {
      students: {href: '/students'},
      courses: {href: '/courses'}
    }
  });
});

app.listen(3000, () => {
  console.log('Student Management API listening on port 3000');
});
