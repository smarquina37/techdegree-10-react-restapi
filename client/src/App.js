import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import apiBaseUrl from "./config";

import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
// import CourseDetail from "./components/CourseDetail";

import withContext from "./Context";

const UserSignUpWithContext = withContext(UserSignUp);

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    axios
      .get(apiBaseUrl)
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
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses" element={<Courses />} />
        {/* <Route path="/courses/:id" element={<CourseDetail />} /> */}
      </Routes>
    </div>
  );
};

export default App;
