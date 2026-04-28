const express = require('express');
const {studentsController} = require('../controllers');
const {routeWrapper} = require('../utils');

const router = express.Router();

router.get('/', routeWrapper(studentsController.list));
router.get('/:id', routeWrapper(studentsController.get));
router.post('/', routeWrapper(studentsController.create));
router.put('/:id', routeWrapper(studentsController.update));
router.delete('/:id', routeWrapper(studentsController.delete));

module.exports = router;
