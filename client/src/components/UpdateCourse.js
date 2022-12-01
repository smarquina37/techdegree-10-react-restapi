import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // useState is a Hook that lets you add React state to function components
  const [setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  // useEffect Hook allows you to perform side effects (fetching data) in your components
  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        setCourse(data);
        setTitle(data.title);
        setDescription(data.description);
        setEstimatedTime(data.estimatedTime);
        setMaterialsNeeded(data.materialsNeeded);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function created to handle input change
  // event.target.name value reflects the name attribute that you specified in your <input> element
  // event.target.value property will reflect the latest value from the <input> element
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

  // This function will update the form data if form validation is successful.
  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // Call the updateCourse() method with context.data.updateCourse()
    // updateCourse() accepts several arguments
    await context.data
      .updateCourse(
        id,
        body,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        //  Check if there are items in the array returned by the Promise, using errors.length
        //  If there are items in the array, it means that there are errors to display to the user
        if (errors.length) {
          // In the if block, use setErrors() to update the errors state to the returned errors
          setErrors(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        // In the event of an error, navigate the user from /signin to /error
        console.error(err);
        navigate("/error");
      });
  };

  // Function for "Cancel" button that returns the user to the default route
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {/* Display validation errors returned from the REST API if there are any */}
      {errors && errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={handleUpdate}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={title}
              onChange={handleChange}
            />

            <p>By Joe Smith</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={handleChange}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={materialsNeeded}
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
