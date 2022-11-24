import React, { Component } from "react";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    // Create a value object to provide the utility methods of the class Data
    const value = {
      data: this.data,
      actions: {
        signIn: this.signIn,
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
    return user;
  };

  signOut = () => {};
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
