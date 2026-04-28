function validateId(id) {
  const numId = Number(id);
  return !Number.isNaN(numId) ? numId : null;
}

function validateStudentData(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('Student name is required');
  }

  if (data.age === undefined || typeof data.age !== 'number' || data.age <= 0) {
    errors.push('Student age must be a positive number');
  }

  return errors;
}

function validateCourseData(data) {
  const errors = [];

  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('Course title is required');
  }

  return errors;
}

module.exports = {
  validateId,
  validateStudentData,
  validateCourseData
};
