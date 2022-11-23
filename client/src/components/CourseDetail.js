import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((resp) => setCourse(resp))
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    context.data.deleteCourse(id);
    // setCourses(courses.filter((c) => c.id !== id));
    // alert(id);
  };

  // onClick={(e) => {deleteCourse(course.id)}}
  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to="update">
            Update Course
          </Link>
          <Link
            className="button"
            onClick={() => {
              handleDelete(course.id);
            }}
          >
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
              <h4 className="course--name">{course.title}</h4>
              <p>By Jose</p>
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
