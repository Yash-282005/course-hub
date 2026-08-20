import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
                {
                    password: password
                }
            )
            .then((res) => {
                setMessage(res.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((err) => {
                setError(
                    err.response?.data?.message ||
                    "Password reset failed."
                );
            });
    };

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">

                                <h4 className="card-title text-center mb-4">
                                    Reset Password
                                </h4>

                                <form onSubmit={handleSubmit}>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder=""
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />

                                        <label htmlFor="password">
                                            New Password
                                        </label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            placeholder=""
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <label htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Reset Password
                                    </button>

                                </form>

                                {message && (
                                    <div className="alert alert-success mt-3">
                                        {message}
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        {error}
                                    </div>
                                )}

                                <div className="text-center mt-3">
                                    <NavLink to="/login">
                                        Back to Login
                                    </NavLink>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;