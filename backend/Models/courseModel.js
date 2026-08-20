const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    c_name: {
        type: String,
        required: true
    },

    c_insturctor: {
        type: String,
        required: true
    },

    c_category: {
        type: String,
        required: true
    },

    c_dutration: {
        type: Number,
        required: true
    },

    c_level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"],
        required: true
    },

    c_thumbnail: {
        type: String,
        required: true
    },

    c_description: {
        type: String,
        required: true
    },

    c_price: {
        type: Number,
        required: true,
        min: 0
    },

    c_rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    c_students: {
        type: Number,
        default: 0,
        min: 0
    },

    c_language: {
        type: String,
        required: true
    },

    c_lessons: {
        type: Number,
        required: true,
        min: 1
    }
});

const courseModel =
    mongoose.models.course ||
    mongoose.model("course", courseSchema);

module.exports = courseModel;