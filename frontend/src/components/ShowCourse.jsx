import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowCourse = () => {
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/course/course/${id}`)
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleEnroll = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    axios
        .post(
            `${import.meta.env.VITE_API_URL}/enrollment/enroll`,
            {
                courseId: id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((res) => {
            alert(res.data.message);
        })
        .catch((err) => {
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            } else {
                alert(
                    err.response?.data?.message ||
                    "Enrollment failed"
                );
            }
        });
};

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("token");

        axios
            .delete(
                `${import.meta.env.VITE_API_URL}/course/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <>
            <div className="bg-dark text-white">
                <div className="container py-5">
                    <div className="row align-items-center">

                        <div className="col-lg-7">

                            <span className="badge bg-primary mb-3">
                                {course.c_category}
                            </span>

                            <h1 className="display-5 fw-bold">
                                {course.c_name}
                            </h1>

                            <p className="lead mt-3">
                                {course.c_description}
                            </p>

                            <div className="d-flex flex-wrap gap-3 mt-4">

                                <span>
                                    {course.c_rating}
                                </span>

                                <span>
                                    {course.c_students} students
                                </span>

                                <span>
                                    {course.c_level}
                                </span>

                            </div>

                            <p className="mt-3 mb-0">
                                Created by{" "}
                                <strong>
                                    {course.c_insturctor}
                                </strong>
                            </p>

                        </div>

                        <div className="col-lg-5 mt-4 mt-lg-0">

                            <div className="card shadow">

                                <img
                                    src={course.c_thumbnail}
                                    alt={course.c_name}
                                    className="card-img-top"
                                    style={{
                                        height: "280px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body text-dark">

                                    <h2 className="fw-bold mb-3">
                                        ₹{course.c_price}
                                    </h2>

                                    <button
                                        className="btn btn-primary btn-lg w-100 mb-3"
                                         onClick={handleEnroll}
                                                                    >
                                                 Enroll Now
                                        </button>

                                    <p className="text-center text-muted small">
                                        Start learning today
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className="container py-5">

                <div className="row">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm mb-4">

                            <div className="card-body">

                                <h3 className="fw-bold mb-4">
                                    Course Description
                                </h3>

                                <p className="text-muted">
                                    {course.c_description}
                                </p>

                            </div>

                        </div>

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <h3 className="fw-bold mb-4">
                                    What you'll learn
                                </h3>

                                <div className="row">

                                    <div className="col-md-6">
                                        <p>✓ Learn {course.c_category}</p>
                                        <p>✓ Build practical skills</p>
                                    </div>

                                    <div className="col-md-6">
                                        <p>✓ Follow structured lessons</p>
                                        <p>✓ Learn from an instructor</p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 mt-4 mt-lg-0">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <h4 className="fw-bold mb-4">
                                    Course Information
                                </h4>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">
                                        Level
                                    </span>
                                    <strong>
                                        {course.c_level}
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">
                                        Duration
                                    </span>
                                    <strong>
                                        {course.c_dutration} hours
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">
                                        Lessons
                                    </span>
                                    <strong>
                                        {course.c_lessons}
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">
                                        Language
                                    </span>
                                    <strong>
                                        {course.c_language}
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">
                                        Students
                                    </span>
                                    <strong>
                                        {course.c_students}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-5">

                    <NavLink
                        className="btn btn-secondary me-3"
                        to="/"
                    >
                        Back To Home
                    </NavLink>

                    {user?.role === "admin" && (
                        <>
                            <NavLink
                                className="btn btn-warning me-3"
                                to={`/edit/${id}`}
                            >
                                Edit
                            </NavLink>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </>
                    )}

                </div>

            </div>
        </>
    );
};

export default ShowCourse;