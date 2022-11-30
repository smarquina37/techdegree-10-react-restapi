import React from "react";
import { Link } from "react-router-dom";

export const Forbidden = () => {
  return (
    <div>
      <h1>Access Denied!</h1>
      <p>Sorry! You do not have access to this page.</p>
      <Link to={"/signin"}>Sign In</Link>
    </div>
  );
};
