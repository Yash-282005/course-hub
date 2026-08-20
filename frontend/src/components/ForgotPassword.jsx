import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
                email: email
            })
            .then((res) => {
                setMessage(res.data.message);
                setEmail("");
            })
            .catch((err) => {
                setError(
                    err.response?.data?.message ||
                    "Something went wrong."
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
                                    Forgot Password
                                </h4>

                                <form onSubmit={handleSubmit}>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder=""
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />

                                        <label htmlFor="email">
                                            Email
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Send Reset Link
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

export default ForgotPassword;