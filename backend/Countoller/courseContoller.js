const courseModel = require("../Models/courseModel");

exports.addCourse = async (req, res) => {
    const new_course = new courseModel(req.body)
    const result = await new_course.save()

    res.status(200).json(result)
}

exports.showcourses = async (req, res) => {
    const courses = await courseModel.find()
    if (courses != null) {
        res.status(200).json(courses)
    } else {
        res.status(404).json({ 'message': 'No Courses' })
    }
}

exports.showCourse = async (req, res) => {
    const course = await courseModel.findById(req.params.id)
    if (course != null) {
        res.status(200).json(course)
    } else {
        res.status(404).json({ message: 'not record found' })
    }
}

exports.updateCourse = async (req, res) => {
    const course = await courseModel.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ message: 'course updated successfully...' })
}

exports.deleteCourse = async (req, res) => {
    const course = await courseModel.findByIdAndDelete(req.params.id)
    if (course != null) {
        res.status(200).json({ message: 'Course deleted successfully...' })
    } else {
        res.status(404).json({ message: 'Course not found...' })
    }
}