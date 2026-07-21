const {courseModel} = require('../models');
const {BaseController, validateCourseData} = require('../utils');

class CourseController extends BaseController {
  constructor() {
    super(courseModel, 'courses');
  }

  validateData(data) {
    return validateCourseData(data);
  }

  sanitizeData(data) {
    return {
      title: data.title.trim()
    };
  }
}

module.exports = new CourseController();
