import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = ({ context }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let user = {
    //   emailAddress,
    //   password,
    //   errors,
    // };

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(() => {
            return ["Sign-in was unsuccessful"];
          });
        } else {
          navigate("/");
        }
      })
      .catch((errors) => {
        console.error(errors);
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
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
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
