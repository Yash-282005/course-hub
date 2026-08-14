import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowCourse = () => {
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/course/course/${id}`)
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:4000/course/${id}`)
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="container my-3">
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col-md-8">
                        <div className="card">

                            <img
                                className="card-img-top"
                                src={course.c_thumbnail}
                                alt={course.c_name}
                                style={{ height: "350px", objectFit: "cover" }}
                            />

                            <div className="card-body">

                                <h4 className="card-title">
                                    {course.c_name}
                                </h4>

                                <p className="card-text">
                                    Instructor: {course.c_insturctor}
                                </p>

                                <p className="card-text">
                                    Category: {course.c_category}
                                </p>

                                <p className="card-text">
                                    Duration: {course.c_dutration}
                                </p>

                                <p className="card-text">
                                    Level: {course.c_level}
                                </p>

                                <NavLink
                                    className="btn btn-secondary me-3"
                                    to="/"
                                >
                                    Back To Home
                                </NavLink>

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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowCourse;