import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const [course, setCourse] = useState({
    c_name: "",
    c_thumbnail: "",
    c_insturctor: "",
    c_category: "",
    c_dutration: "",
    c_level: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/course/course/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/course/${id}`, course)
      .then(() => navigate(`/show/${id}`))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center align-items-center g-2">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Edit Course</h4>

                <form onSubmit={handleSubmit}>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="c_name"
                      value={course.c_name}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_name: e.target.value
                        })
                      }
                    />
                    <label htmlFor="c_name">Course Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="c_thumbnail"
                      value={course.c_thumbnail}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_thumbnail: e.target.value
                        })
                      }
                    />
                    <label htmlFor="c_thumbnail">Image</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="c_insturctor"
                      value={course.c_insturctor}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_insturctor: e.target.value
                        })
                      }
                    />
                    <label htmlFor="c_insturctor">Instructor</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="c_category"
                      value={course.c_category}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_category: e.target.value
                        })
                      }
                    />
                    <label htmlFor="c_category">Category</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="c_dutration"
                      value={course.c_dutration}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_dutration: e.target.value
                        })
                      }
                    />
                    <label htmlFor="c_dutration">Duration</label>
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="c_level"
                      value={course.c_level}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_level: e.target.value
                        })
                      }
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advance">Advance</option>
                    </select>

                    <label htmlFor="c_level">Level</label>
                  </div>

                  <NavLink
                    className="btn btn-secondary me-3"
                    to="/"
                  >
                    Back To Home
                  </NavLink>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Edit
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;