const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/list_courses', meController.listCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
