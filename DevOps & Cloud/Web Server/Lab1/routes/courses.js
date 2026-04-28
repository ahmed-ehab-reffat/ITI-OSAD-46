const express = require('express');
const {coursesController} = require('../controllers');
const {routeWrapper} = require('../utils');

const router = express.Router();

router.get('/', routeWrapper(coursesController.list));
router.get('/:id', routeWrapper(coursesController.get));
router.post('/', routeWrapper(coursesController.create));
router.put('/:id', routeWrapper(coursesController.update));
router.delete('/:id', routeWrapper(coursesController.delete));

module.exports = router;
