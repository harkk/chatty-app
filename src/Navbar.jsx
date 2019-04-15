import React, { Component } from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar">
          <a href="/" className="navbar-brand">ChattyApp</a>
          <p>User Count: {this.state.userCount.count}</p>
        </nav>
      </header>
    );
  };
};