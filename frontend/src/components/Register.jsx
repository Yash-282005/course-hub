import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:4000/auth/register", user)
            .then((res) => {
                console.log(res.data);
                navigate("/login");
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
                                    Register
                                </h4>

                                <form onSubmit={handleSubmit}>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder=""
                                            value={user.name}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    name: e.target.value
                                                })
                                            }
                                            required
                                        />
                                        <label htmlFor="name">
                                            Name
                                        </label>
                                    </div>

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
                                        Register
                                    </button>

                                </form>

                                <div className="text-center mt-3">
                                    Already have an account?{" "}
                                    <NavLink to="/login">
                                        Login
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

export default Register;