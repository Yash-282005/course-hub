const express = require('express');
const { addCourse, showcourses, updateCourse, showCourse, deleteCourse } = require('../Countoller/courseContoller');
const { verifyToken, verifyAdmin } = require('../Middleware/authMiddleware');

const routes = express.Router();

routes.post('/add', verifyToken, verifyAdmin, addCourse);
routes.get('/', showcourses);
routes.put('/:id', verifyToken, verifyAdmin, updateCourse);
routes.get('/course/:id', showCourse);
routes.delete('/:id', verifyToken, verifyAdmin, deleteCourse);

module.exports = routes;