import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-auto">
            <div className="container py-5">

                <div className="row g-4">

                    {/* Brand */}
                    <div className="col-md-6 col-lg-5">
                        <h4 className="fw-bold">
                            CourseHub
                        </h4>

                        <p className="text-secondary mb-0">
                            Learn skills that move you forward.
                            Explore practical courses and build
                            skills for your future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-6 col-md-3 col-lg-3">
                        <h6 className="fw-bold mb-3">
                            Quick Links
                        </h6>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <NavLink
                                    to="/"
                                    className="text-secondary text-decoration-none"
                                >
                                    Courses
                                </NavLink>
                            </li>

                            <li className="mb-2">
                                <NavLink
                                    to="/login"
                                    className="text-secondary text-decoration-none"
                                >
                                    Login
                                </NavLink>
                            </li>

                            <li className="mb-2">
                                <NavLink
                                    to="/register"
                                    className="text-secondary text-decoration-none"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div className="col-6 col-md-3 col-lg-4">
                        <h6 className="fw-bold mb-3">
                            Platform
                        </h6>

                        <p className="text-secondary small mb-2">
                            Discover courses
                        </p>

                        <p className="text-secondary small mb-2">
                            Learn at your own pace
                        </p>

                        <p className="text-secondary small mb-0">
                            Build new skills
                        </p>
                    </div>

                </div>

                <hr className="border-secondary my-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

                    <p className="text-secondary small mb-0">
                       © 2026 CourseHub. All rights reserved. · Created by Yash Poojary
                    </p>

                    <p className="text-secondary small mb-0">
                        Built with React & Node.js
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;