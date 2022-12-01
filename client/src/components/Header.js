import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    // extract context from this.props to make the data easier to manage
    const { context } = this.props;
    // Store the authenticatedUser data in a variable named authUser
    const authUser = context.authenticatedUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            {/* use a conditional (ternary) operator to render content representing current state,
            using the value of authUser as the condition */}
            {authUser ? (
              <ul className="header--signedin">
                <li>{`Welcome, ${authUser.firstName} ${authUser.lastName}!`}</li>
                <li>
                  <Link className="signout" to="/signout">
                    Sign Out
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="header--signedout">
                <li>
                  <Link className="signup" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="signin" to="/signin">
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    );
  }
}
