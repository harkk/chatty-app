import React, { Component } from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChattyApp</a>
          <p id="userCount">User count: {this.props.userCount}</p>
        </nav>
      </header>
    );
  };
};