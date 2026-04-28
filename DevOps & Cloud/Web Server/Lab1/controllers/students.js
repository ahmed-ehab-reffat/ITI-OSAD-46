const {studentModel} = require('../models');
const {BaseController, validateStudentData} = require('../utils');

class StudentController extends BaseController {
  constructor() {
    super(studentModel, 'students');
  }

  validateData(data) {
    return validateStudentData(data);
  }

  sanitizeData(data) {
    return {
      name: data.name.trim(),
      age: data.age
    };
  }
}

module.exports = new StudentController();
