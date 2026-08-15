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
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">

          <NavLink className="navbar-brand" to="/">
            Course
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="collapsibleNavId"
          >

            <ul className="navbar-nav me-auto mt-2 mt-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              {user?.role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/add">
                    Add Course
                  </NavLink>
                </li>
              )}

            </ul>

            <ul className="navbar-nav">

              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      {user.name}
                    </span>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;