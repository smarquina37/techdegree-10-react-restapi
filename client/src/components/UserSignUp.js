import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// This component provides the "Sign Up" screen by rendering a form
// that allows a user to sign up by creating a new account
const UserSignUp = ({ context }) => {
  // useState is a Hook that lets you add React state to function components
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // Function created to handle input change
  // event.target.name value reflects the name attribute that you specified in your <input> element
  // event.target.value property will reflect the latest value from the <input> element
  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName") {
      setFirstName(e.target.value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "emailAddress") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    };

    context.data
      // Calls the createUser() method from Data.js with context.data.createUser().
      // createUser() accepts one argument, which is the user object
      .createUser(user)
      .then((errors) => {
        //  Check if there are items in the array returned by the Promise, using errors.length
        //  If there are items in the array, it means that there are errors to display to the user
        if (errors.length) {
          // In the if block, use setErrors() to update the errors state to the returned errors
          setErrors(errors);
        } else {
          // If response returns no errs (or empty arr), means new user successfully created and sent to the server
          context.actions.signIn(emailAddress, password).then(() => {
            navigate("/");
          });
        }
      })
      // In the event of an error, navigate the user from /signin to /error
      .catch((errors) => {
        console.log(errors);
        navigate("/error");
      });
  };

  // Function for "Cancel" button that returns the user to the default route
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {/* Display validation errors returned from the REST API if there are any */}
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
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
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
