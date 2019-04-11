import React, { Component } from 'react';
import Message from './Message.jsx';

export default class MessageList extends React.Component {
  render() {
    const messages = this.props.messages.map((message) => {
      console.log(message)
      return <Message key={message.id} message={message}/>
    });

    return(
    <div>
      {messages}
    </div>
    );
  };
}