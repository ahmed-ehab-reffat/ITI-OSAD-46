const {BaseModel} = require('../utils');

class CourseModel extends BaseModel {
  constructor() {
    super('courses');
  }
}

module.exports = new CourseModel();
