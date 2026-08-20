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
    c_level: "",
    c_description: "",
    c_price: "",
    c_language: "",
    c_lessons: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/course/course/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/course/${id}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        navigate(`/show/${id}`);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          console.log(err);
        }
      });
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
                      required
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
                      required
                    />
                    <label htmlFor="c_thumbnail">Thumbnail URL</label>
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
                      required
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
                      required
                    />
                    <label htmlFor="c_category">Category</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="c_description"
                      placeholder=""
                      style={{ height: "120px" }}
                      value={course.c_description}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_description: e.target.value
                        })
                      }
                      required
                    ></textarea>
                    <label htmlFor="c_description">
                      Course Description
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="c_dutration"
                      min="1"
                      value={course.c_dutration}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_dutration: e.target.value
                        })
                      }
                      required
                    />
                    <label htmlFor="c_dutration">
                      Duration (Hours)
                    </label>
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
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advance">Advance</option>
                    </select>

                    <label htmlFor="c_level">Level</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="c_price"
                      min="0"
                      value={course.c_price}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_price: e.target.value
                        })
                      }
                      required
                    />
                    <label htmlFor="c_price">Price (₹)</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="c_language"
                      value={course.c_language}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_language: e.target.value
                        })
                      }
                      required
                    />
                    <label htmlFor="c_language">Language</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="c_lessons"
                      min="1"
                      value={course.c_lessons}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          c_lessons: e.target.value
                        })
                      }
                      required
                    />
                    <label htmlFor="c_lessons">
                      Number of Lessons
                    </label>
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