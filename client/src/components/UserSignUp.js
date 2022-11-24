import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = ({ context }) => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = {
    firstName,
    lastName,
    emailAddress,
    password,
  };

  const handleSubmit = (e) => {
    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors({ errors });
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

    const handleCancel = (e) => {
      e.preventDefault();
      navigate("/");
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
          />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value={lastName} />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button className="button button-secondary" onclick={handleCancel}>
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
};

export default UserSignUp;
