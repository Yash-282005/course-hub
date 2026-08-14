const express = require('express');
const {
    addCourse,
    showcourses,
    updateCourse,
    showCourse,
    delCourse
} = require('../Countoller/courseContoller');

const routes = express.Router();

routes.post('/add', addCourse);
routes.get('/', showcourses);
routes.put('/:id', updateCourse);
routes.get('/course/:id', showCourse);
routes.delete('/:id', delCourse);

module.exports = routes;