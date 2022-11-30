import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();

    this.cookie = Cookies.get("authenticatedUser");
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  state = {
    authenticatedUser: null,
  };

  render() {
    const { authenticatedUser } = this.state;
    // Create a value object to provide the utility methods of the class Data
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    // Pass context to the Provider
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  // function that retrieves a registered user's credentials from the server
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    const plainText = password;

    if (user !== null) {
      user.password = plainText;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
