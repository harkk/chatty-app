import React, {Component} from 'react';

export default class Message extends Component {
  render() {
    if (this.props.message.type === "incomingMessage") {
      return (
      <div>
        <main className="messages">
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        </main>
      </div>
      );
    } else if (this.props.message.type === "incomingNotification"){
      return (
      <div>
        <main>
          <div className="notification">
            <span className="notification-content">{this.props.message.content}</span>
          </div>
        </main>
      </div>
      );
    }
  }
}