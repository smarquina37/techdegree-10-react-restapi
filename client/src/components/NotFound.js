import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link to={"/"}>Home Page</Link>
    </div>
  );
}
