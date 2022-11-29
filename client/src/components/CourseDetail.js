import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => setCourse(data))
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    await context.data
      .deleteCourse(
        id,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate("/");
        }
      })
      .catch((errors) => {
        console.error(errors);
      });
  };

  return (
    <main>
      <div className="actions--bar">
        {context.authenticatedUser &&
        context.authenticatedUser.id === course.user?.id ? (
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
        ) : (
          <div className="wrap">
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        )}
      </div>
      <div className="wrap">
        <form>
          <h2>Course Detail</h2>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By {course.user?.firstName} {course.user?.lastName}
              </p>
              <ReactMarkdown children={course.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
