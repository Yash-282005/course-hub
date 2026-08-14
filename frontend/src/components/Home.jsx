import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/course/")
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

  return (
    <>
      <div className="container my-3">

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="row justify-content-center g-2">

          {filteredCourse.map((course) => (
            <div className="col-md-4 mb-4" key={course._id}>

              <div className="card h-100">

                <img
                  className="card-img-top"
                  src={course.c_thumbnail}
                  alt={course.c_name}
                  style={{ height: "250px" }}
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
                    className="btn btn-primary"
                    to={`/show/${course._id}`}
                  >
                    Read More
                  </NavLink>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default Home;