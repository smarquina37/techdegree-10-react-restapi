import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
// import CourseDetail from "./components/CourseDetail";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses" element={<Courses />} />
        {/* <Route path="/courses/:id" element={<CourseDetail />} /> */}
      </Routes>
      {/* {data.map((data) => (
        <li>{data.title}</li>
      ))} */}
    </div>
  );
};

export default App;
