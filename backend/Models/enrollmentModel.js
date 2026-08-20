const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },

    enrolledAt: {
        type: Date,
        default: Date.now
    },

    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    completed: {
        type: Boolean,
        default: false
    }
});

const enrollmentModel = mongoose.model(
    "enrollment",
    enrollmentSchema
);

module.exports = enrollmentModel;