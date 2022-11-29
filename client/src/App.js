import React from "react";
import { Route, Routes } from "react-router-dom";
import withContext from "./Context";

/* COMPONENTS */
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import PrivateRoutes from "./components/PrivateRoutes";

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/courses/:id/update"
            element={<UpdateCourseWithContext />}
          />
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
        </Route>
        <Route path="/" element={<CoursesWithContext />} />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        <Route path="/courses" element={<CoursesWithContext />} />
        <Route path="/courses/:id" element={<CourseDetailWithContext />} />
        <Route element={NotFound} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
