import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/login`, user)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/");
            })
            .catch((err) => {
                setError(
                    err.response?.data?.message || "Login failed"
                );
            });
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">

                        <div className="text-center mb-4">
                            <h2 className="fw-bold">
                                CourseHub
                            </h2>

                            <p className="text-muted">
                                Continue learning and build your skills
                            </p>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4 p-md-5">

                                <h3 className="fw-bold mb-2">
                                    Welcome back
                                </h3>

                                <p className="text-muted mb-4">
                                    Sign in to continue to CourseHub.
                                </p>

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder=""
                                            value={user.email}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    email: e.target.value
                                                })
                                            }
                                            required
                                        />

                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                    </div>

                                    <div className="form-floating mb-2">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder=""
                                            value={user.password}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    password: e.target.value
                                                })
                                            }
                                            required
                                        />

                                        <label htmlFor="password">
                                            Password
                                        </label>
                                    </div>

                                    <div className="text-end mb-4">
                                        <NavLink
                                            to="/forgot-password"
                                            className="text-decoration-none"
                                        >
                                            Forgot Password?
                                        </NavLink>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                    >
                                        Login
                                    </button>

                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-muted">
                                        Don't have an account?{" "}
                                    </span>

                                    <NavLink
                                        to="/register"
                                        className="fw-semibold text-decoration-none"
                                    >
                                        Create Account
                                    </NavLink>
                                </div>

                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <NavLink
                                to="/"
                                className="text-muted text-decoration-none"
                            >
                                Back to Courses
                            </NavLink>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;