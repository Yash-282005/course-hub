import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:4000/auth/login", user)
            .then((res) => {
                console.log(res.data);

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/");
            })
            .catch((err) => {
                console.log(err);
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
                                    Login
                                </h4>

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
                                            Email
                                        </label>
                                    </div>

                                    <div className="form-floating mb-3">
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

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Login
                                    </button>

                                </form>

                                <div className="text-center mt-3">
                                    Don't have an account?{" "}
                                    <NavLink to="/register">
                                        Register
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

export default Login;