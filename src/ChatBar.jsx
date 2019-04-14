import React, { Component } from 'react';

export default class ChatBar extends React.Component{
  onUsername = (e) => {
    if (e.keyCode === 13) {
      this.props.addUser(e.target.value)
    }
  }

  onMessageSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.addMessage(e.target.value)
      e.target.value = ""
    }
  }

  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} onKeyDown={this.onUsername} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.onMessageSubmit} />
      </footer>
    );
  };
}