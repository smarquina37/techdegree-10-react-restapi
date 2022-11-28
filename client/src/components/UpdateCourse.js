import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => setCourse(data))
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    if (name === "courseTitle") {
      setTitle(value);
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    } else {
      return;
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data
      .updateCourse(
        body,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length !== 0) {
          setErrors(
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          );
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {errors}
      <form onSubmit={handleUpdate}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              defaultValue={course.title}
              onChange={handleChange}
            />

            <p>By Joe Smith</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              defaultValue={course.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue={course.estimatedTime}
              onChange={handleChange}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={course.materialsNeeded}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};
export default UpdateCourse;
