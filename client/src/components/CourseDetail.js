import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const CourseDetail = ({ context }) => {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => setCourses(data))
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    context.data
      .deleteCourse(
        id,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((resp) => {
        navigate("/");
      });
  };

  console.log(context.authenticatedUser);
  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to="update">
            Update Course
          </Link>
          <Link className="button" onClick={handleDelete}>
            Delete Course
          </Link>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <form>
          <h2>Course Detail</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{courses.title}</h4>
              <p>
                By {courses.user?.firstName} {courses.user?.lastName}
              </p>
              <ReactMarkdown children={courses.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{courses.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={courses.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
