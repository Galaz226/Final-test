const express = require('express');
const router = express.Router();
const teacherController = require('../Controllers/teacherController');
const validateRequest = require('../middleware/validateRequest');

router.get('/', teacherController.getAllTeachers);
router.post('/', teacherController.createTeacher);
router.post('/', validateRequest.teacher, teacherController.createTeacher);

module.exports = router;