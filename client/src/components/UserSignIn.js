import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserSignIn = ({ context }) => {
  const [user, setUser] = useState({
    emailAddress: "",
    password: "",
    errors: [],
  });

  const navigate = useNavigate();

  // const user = {
  //   emailAddress,
  //   password,
  // };

  const handleSubmit = (e) => {
    context.data.actions
      .signIn(username, password)
      .then((user) => {
        if (user === null) {
          setErrors(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          navigate("/authenticated");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  const handleChange = (e) => {
    e.prevantDefault();
    setUser({ ...user, [e.target.name]: [e.target.value] });
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
// const [emailAddress, setEmailAddress] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState(null);
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   context.data.getUser(user)
//   .then(user =>{
//     if (user === null) {
//       createUser(() => {
//         return {errors: ['sign-in was unsuccessful']}
//       })
//     } else {
//           navigate('/authenticated');
//           console.log(`SUCCESS! ${username} is now signed in!`)
//         }
//       .catch(err => {
//         console.log(err)
//       })
//     })
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
