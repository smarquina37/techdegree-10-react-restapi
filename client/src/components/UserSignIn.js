import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserSignIn = ({ context }) => {
  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          // onChange={handleChange}
          value=""
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          // onChange={handleChange}
          value=""
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
