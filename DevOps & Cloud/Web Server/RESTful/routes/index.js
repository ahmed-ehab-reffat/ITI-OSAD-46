const express = require('express');

const router = express.Router();

router.use('/students', require('./students'));
router.use('/courses', require('./courses'));

module.exports = router;
