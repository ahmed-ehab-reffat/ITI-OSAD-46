// const asyncWrapper = require('./asyncWrapper');
// const [error, result] = await asyncWrapper(handler(req, res, next));

function routeWrapper(handler) {
  return (req, res, next) => {
    const [error, result] = handler(req, res, next);

    if (!error) {
      const status = req.method === 'POST' ? 201 : 200;
      return res.status(status).json(result);
    }

    next(error);
  };
}

module.exports = routeWrapper;
