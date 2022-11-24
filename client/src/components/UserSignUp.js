import React, { useState } from "react";
import { Link } from "react-router-dom";

export const UserSignUp = ({ context }) => {
  // let history = useHistory();
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

  // context.data.createUser(user)
  // .then(errors => {
  //   if (errors.length) {
  //     setErrors(errors)
  //   } else {
  //     context.actions.signIn(emailAddress, password)
  //     .then(() => {
  //       this.props.history.push('/authenticated')
  //     })
  //   }
  // })
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   submit();
  // };

  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   cancel();
  // };

  return (
    <div class="form--centered">
      <h2>Sign Up</h2>

      <form>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" value="" />
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" value="" />
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value="" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" value="" />
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
