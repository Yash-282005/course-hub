import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      return JSON.parse(storedUser);
    }

    return null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">

        <NavLink
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
           CourseHub
        </NavLink>

        <div className="d-flex align-items-center gap-3">

          <NavLink
  className="nav-link text-white"
  to="/"
>
  Courses
</NavLink>



{user?.role === "admin" && (
  <NavLink
    className="nav-link text-white"
    to="/add"
  >
    Add Course
  </NavLink>
)}

{user && user.role !== "admin" && (
    <NavLink
        className="nav-link text-white"
        to="/my-courses"
    >
        My Courses
    </NavLink>
)}


          {!user ? (
            <>
              <NavLink
                className="nav-link text-white"
                to="/login"
              >
                Login
              </NavLink>

              <NavLink
                className="btn btn-primary"
                to="/register"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-white">
                Hi, <strong>{user.name}</strong>
              </span>

              {user.role === "admin" && (
                <span className="badge bg-warning text-dark">
                  Admin
                </span>
              )}

              <button
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;