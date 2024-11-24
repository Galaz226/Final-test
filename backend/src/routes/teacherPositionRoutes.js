const express = require('express');
const router = express.Router();
const teacherPositionController = require('../Controllers/teacherPositionController');
const validateRequest = require('../middleware/validateRequest');

router.post('/', validateRequest.teacherPosition, teacherPositionController.createPosition);
router.get('/', teacherPositionController.getAllPositions);
router.post('/', teacherPositionController.createPosition);

module.exports = router;