import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = ({ context }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = {
    firstName,
    lastName,
    emailAddress,
    password,
  };

  let navigate = useNavigate();

  const handleChange = (e) => {
    e.prevantDefault();
    if (e.target.name === "firstName") {
      setFirstName(value);
    } else if (e.target.name === "lastName") {
      setLastName(value);
    } else if (e.target.name === "emailAddress") {
      setEmailAddress(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.prevantDefault();

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            navigate("/authenticated");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <div class="form--centered">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={handleChange}
        />
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
        <button class="button" type="submit">
          Sign Up
        </button>
        <button
          class="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to{" "}
        <Link to="sign-in.html">sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
