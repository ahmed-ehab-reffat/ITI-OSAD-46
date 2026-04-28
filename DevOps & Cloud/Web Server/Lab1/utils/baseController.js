const CustomError = require('./CustomError');
const {validateId} = require('./validation');

class BaseController {
  constructor(model, resourceName) {
    this.model = model;
    this.resourceName = resourceName;
    this.resourceNameSingular = resourceName.slice(0, -1);

    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  buildLinks(item) {
    return {
      self: {href: `/${this.resourceName}/${item.id}`},
      all: {href: `/${this.resourceName}`}
    };
  }

  badRequest(message) {
    throw new CustomError({
      statusCode: 400,
      message,
      code: 'BAD_REQUEST'
    });
  }

  notFound(id) {
    throw new CustomError({
      statusCode: 404,
      message: `${this.resourceNameSingular} with id ${id} not found`,
      code: 'NOT_FOUND'
    });
  }

  list(req, res) {
    const items = this.model.getAll().map((item) => ({
      ...item,
      _links: this.buildLinks(item)
    }));

    return res.status(200).json({
      data: items,
      _links: {
        self: {href: `/${this.resourceName}`},
        create: {href: `/${this.resourceName}`, method: 'POST'}
      }
    });
  }

  get(req, res) {
    const id = validateId(req.params.id);

    if (id === null) {
      this.badRequest(`${this.resourceNameSingular} id must be a number`);
    }

    const item = this.model.getById(id);

    if (!item) {
      this.notFound(id);
    }

    return res.status(200).json({
      ...item,
      _links: this.buildLinks(item)
    });
  }

  create(req, res) {
    const validationErrors = this.validateData(req.body);

    if (validationErrors.length > 0) {
      this.badRequest(validationErrors.join(', '));
    }

    const newItem = this.model.create(this.sanitizeData(req.body));

    return res.status(201).json({
      message: `${this.resourceNameSingular} created`,
      [this.resourceNameSingular]: newItem,
      _links: this.buildLinks(newItem)
    });
  }

  update(req, res) {
    const id = validateId(req.params.id);

    if (id === null) {
      this.badRequest(`${this.resourceNameSingular} id must be a number`);
    }

    const existing = this.model.getById(id);

    if (!existing) {
      this.notFound(id);
    }

    const validationErrors = this.validateData(req.body);

    if (validationErrors.length > 0) {
      this.badRequest(validationErrors.join(', '));
    }

    const updatedItem = this.model.update(id, this.sanitizeData(req.body));

    return res.status(200).json({
      message: `${this.resourceNameSingular} updated`,
      [this.resourceNameSingular]: updatedItem,
      _links: this.buildLinks(updatedItem)
    });
  }

  delete(req, res) {
    const id = validateId(req.params.id);

    if (id === null) {
      this.badRequest(`${this.resourceNameSingular} id must be a number`);
    }

    const deletedItem = this.model.remove(id);

    if (!deletedItem) {
      this.notFound(id);
    }

    return res.status(200).json({
      message: `${this.resourceNameSingular} with id ${id} deleted`,
      _links: {
        all: {href: `/${this.resourceName}`}
      }
    });
  }

  // To be overridden by subclasses
  validateData(_) {
    throw new Error('validateData must be implemented by subclass');
  }

  // To be overridden by subclasses
  sanitizeData(_) {
    throw new Error('sanitizeData must be implemented by subclass');
  }
}

module.exports = BaseController;
