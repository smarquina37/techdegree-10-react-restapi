import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const { id } = useParams();

  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  useEffect(() => {
    context.data
      .getCourse(id)
      .then(setCourse)
      // .then(setTitle)
      // .then(setEstimatedTime)
      // .then(setMaterialsNeeded)
      // .then((resp) => setCourse(resp))
      // .then((resp) => setDescription(resp))
      // .then((resp) => setEstimatedTime(resp))
      // .then((resp) => setMaterialsNeeded(resp))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={course.title}
            />
            <p>
              By Jasmine
              {/* By {course.user.firstName} {course.user.lastName} */}
            </p>
            <label for="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription">
              {course.description}
            </textarea>
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
            />

            <label for="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded">
              {course.materialsNeeded}
            </textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
