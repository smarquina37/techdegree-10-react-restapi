import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserSignIn = ({ context }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    emailAddress: "",
    password: "",
  });

  const { emailAddress, password } = user;
  // const [emailAdress, setEmailAddress] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);

  // const user = {
  //   emailAdress,
  //   password,
  // };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.prevantDefault();
    navigate("/");
    e.currentTarget.reset();
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          onChange={handleChange}
          value={emailAddress}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
        />
        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary">Cancel</button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
