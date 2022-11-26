import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = ({ context }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "emailAddress") {
      setEmailAddress(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      emailAddress,
      password,
      errors,
    };

    context.actions
      .signIn(user)
      .then((user) => {
        if (user === null) {
          setErrors(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/error");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      {errors && errors.length ? (
        <div className="validation--errors">{errors}</div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={emailAddress}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
