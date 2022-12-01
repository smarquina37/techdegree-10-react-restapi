import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// This component provides the "Sign In" screen by rendering a form
// that allows a user to sign in using their existing account information
const UserSignIn = ({ context }) => {
  // useState is a Hook that lets you add React state to function components
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // Function created to handle input change
  // event.target.name value reflects the name attribute that you specified in your <input> element
  // event.target.value property will reflect the latest value from the <input> element
  const handleChange = (e) => {
    e.preventDefault();
    // The event.target.name value reflects the name attribute that you specified in your <input> element
    // The event.target.value property will reflect the latest value from the <input> element
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
    // Call the signIn() function from context
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        // If the returned promise value is null, set the errors state of the UserSignIn
        // class to an array which holds a string "Sign-in was unsuccessful"
        if (user === null) {
          setErrors(() => {
            return ["Sign-in was unsuccessful"];
          });
        } else {
          // If the response returns the user object (response status is 200), navigate the user
          // from the /signin route to the home page or previous page
          navigate(from, { replace: true });
        }
      })
      // In the event of an error, navigate the user from /signin to /error
      .catch((errors) => {
        console.error(errors);
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
      <h2>Sign In</h2>
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
