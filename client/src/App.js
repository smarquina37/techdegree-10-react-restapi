import React from "react";
import { Route, Routes } from "react-router-dom";
import withContext from "./Context";

/* COMPONENTS */
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<CoursesWithContext />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetailWithContext />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;

// import axios from "axios";
// import apiBaseUrl from "./config";
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchApi();
//   }, []);

//   const fetchApi = () => {
//     axios
//       .get(apiBaseUrl)
//       .then((resp) => {
//         setData(resp.data);
//       })
//       .catch((error) => {
//         console.log("Error fetching and parsing data", error);
//       });
//   };
