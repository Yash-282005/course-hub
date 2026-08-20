import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/course/`)
      .then((res) => {
        setCourse(res.data);
        setFilteredCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    const result = course.filter(
      (item) =>
        item.c_name.toLowerCase().includes(search.toLowerCase()) ||
        item.c_insturctor.toLowerCase().includes(search.toLowerCase()) ||
        item.c_category.toLowerCase().includes(search.toLowerCase()) ||
        item.c_level.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCourse(result);
  };

  const handleCategory = (category) => {
    if (category === "All") {
      setFilteredCourse(course);
      return;
    }

    const result = course.filter(
      (item) =>
        item.c_category.toLowerCase() === category.toLowerCase()
    );

    setFilteredCourse(result);
  };

  return (
    <>
      <section className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-primary mb-3">
                COURSEHUB
              </span>

              <h1 className="display-4 fw-bold">
                Learn skills that move you forward
              </h1>

              <p className="lead text-light mt-3">
                Explore practical courses taught by experienced
                instructors and build skills for your future.
              </p>

              <div className="input-group input-group-lg mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What do you want to learn?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                <button
                  className="btn btn-primary px-4"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">

        <div className="d-flex flex-wrap gap-2 mb-5">
          <button
            className="btn btn-outline-primary rounded-pill"
            onClick={() => handleCategory("All")}
          >
            All Courses
          </button>

          <button
            className="btn btn-outline-secondary rounded-pill"
            onClick={() => handleCategory("Web Development")}
          >
            Web Development
          </button>

          <button
            className="btn btn-outline-secondary rounded-pill"
            onClick={() => handleCategory("Programming")}
          >
            Programming
          </button>

          <button
            className="btn btn-outline-secondary rounded-pill"
            onClick={() => handleCategory("Database")}
          >
            Database
          </button>

          <button
            className="btn btn-outline-secondary rounded-pill"
            onClick={() => handleCategory("Data Science")}
          >
            Data Science
          </button>
        </div>

        <div className="mb-4">
          <h2 className="fw-bold">
            Explore our courses
          </h2>

          <p className="text-muted">
            Choose from our growing collection of courses.
          </p>
        </div>

        <div className="row g-4">

          {filteredCourse.map((course) => (
            <div
              className="col-sm-6 col-lg-4"
              key={course._id}
            >
              <div className="card h-100 border-0 shadow-sm">

                <img
                  src={course.c_thumbnail}
                  alt={course.c_name}
                  className="card-img-top"
                  style={{
                    height: "210px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <div className="mb-2">
                    <span className="badge bg-light text-primary">
                      {course.c_category}
                    </span>

                    <span className="badge bg-light text-dark ms-2">
                      {course.c_level}
                    </span>
                  </div>

                  <h5 className="card-title fw-bold">
                    {course.c_name}
                  </h5>

                  <p className="text-muted mb-2">
                    {course.c_description}
                  </p>

                  <p className="small text-muted mb-2">
                    By {course.c_insturctor}
                  </p>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fw-bold text-warning">
                      ★ {course.c_rating}
                    </span>

                    <span className="small text-muted">
                      ({course.c_students} students)
                    </span>
                  </div>

                  <div className="small text-muted mb-3">
                    {course.c_dutration} hours ·{" "}
                    {course.c_lessons} lessons ·{" "}
                    {course.c_language}
                  </div>

                  <div className="mt-auto d-flex justify-content-between align-items-center">

                    <span className="fs-5 fw-bold">
                      ₹{course.c_price}
                    </span>

                    <NavLink
                      className="btn btn-primary"
                      to={`/show/${course._id}`}
                    >
                      View Course
                    </NavLink>

                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {filteredCourse.length === 0 && (
          <div className="text-center py-5">
            <h4>No courses found</h4>
            <p className="text-muted">
              Try searching for another course or category.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => {
                setSearch("");
                setFilteredCourse(course);
              }}
            >
              View All Courses
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default Home;