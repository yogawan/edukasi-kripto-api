const express = require('express');
const { getCourses, addCourse } = require('../controllers/courseController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getCourses);
router.post('/', verifyToken, addCourse);

module.exports = router;