const {BaseModel} = require('../utils');

class StudentModel extends BaseModel {
  constructor() {
    super('students');
  }
}

module.exports = new StudentModel();
