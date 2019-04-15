import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    return (
      <div id= "messages-container">
        {this.props.messages.map(message =>
        <Message key = {message.id} message = {message}/>)}
      </div>
    );
  }
}