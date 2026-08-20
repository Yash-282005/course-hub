import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(
                `${import.meta.env.VITE_API_URL}/enrollment/my-courses`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((res) => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);

                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                } else {
                    console.log(err);
                }
            });
    }, [navigate]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary"></div>
                <p className="text-muted mt-3">
                    Loading your courses...
                </p>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">

                <div className="mb-5">
                    <h1 className="fw-bold">
                        My Courses
                    </h1>

                    <p className="text-muted">
                        Continue learning from where you left off.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center py-5">

                            <h3 className="fw-bold">
                                You haven't enrolled in any courses yet
                            </h3>

                            <p className="text-muted mb-4">
                                Explore our courses and start learning today.
                            </p>

                            <NavLink
                                to="/"
                                className="btn btn-primary"
                            >
                                Explore Courses
                            </NavLink>

                        </div>
                    </div>
                ) : (
                    <div className="row g-4">

                        {courses.map((enrollment) => (
                            <div
                                className="col-md-6 col-lg-4"
                                key={enrollment._id}
                            >
                                <div className="card h-100 border-0 shadow-sm">

                                    <img
                                        src={enrollment.courseId?.c_thumbnail}
                                        alt={enrollment.courseId?.c_name}
                                        className="card-img-top"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div className="card-body d-flex flex-column">

                                        <span className="badge bg-light text-primary align-self-start mb-2">
                                            {enrollment.courseId?.c_category}
                                        </span>

                                        <h5 className="fw-bold">
                                            {enrollment.courseId?.c_name}
                                        </h5>

                                        <p className="text-muted small">
                                            By {enrollment.courseId?.c_insturctor}
                                        </p>

                                        <div className="mb-2">
                                            <div className="d-flex justify-content-between small mb-1">
                                                <span>
                                                    Progress
                                                </span>

                                                <strong>
                                                    {enrollment.progress}%
                                                </strong>
                                            </div>

                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${enrollment.progress}%`
                                                    }}
                                                    aria-valuenow={enrollment.progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="small text-muted mb-3">
                                            {enrollment.courseId?.c_dutration} hours ·{" "}
                                            {enrollment.courseId?.c_lessons} lessons
                                        </div>

                                        <NavLink
                                            to={`/show/${enrollment.courseId?._id}`}
                                            className="btn btn-primary mt-auto"
                                        >
                                            Continue Learning
                                        </NavLink>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default MyCourses;