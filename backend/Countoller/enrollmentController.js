const enrollmentModel = require("../Models/enrollmentModel");
const courseModel = require("../Models/courseModel");

exports.enrollCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const existingEnrollment = await enrollmentModel.findOne({
            userId,
            courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                message: "You are already enrolled in this course"
            });
        }

        const enrollment = new enrollmentModel({
            userId,
            courseId
        });

        const result = await enrollment.save();

        await courseModel.findByIdAndUpdate(
            courseId,
            {
                $inc: {
                    c_students: 1
                }
            }
        );

        res.status(201).json({
            message: "Course enrolled successfully",
            enrollment: result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Enrollment failed"
        });
    }
};

exports.getMyCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const enrollments = await enrollmentModel
            .find({ userId })
            .populate("courseId");

        res.status(200).json(enrollments);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch enrolled courses"
        });
    }
};