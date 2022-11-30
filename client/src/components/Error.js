import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div>
      <h1>Error</h1>
      <p>Oops! An unexpected error has occurred.</p>
      <Link to={"/"}>Home Page</Link>
    </div>
  );
};
