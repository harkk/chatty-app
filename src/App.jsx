import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: {count: 0}
    };
    this.addMessage = this.addMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentDidMount() {
    //connecting react app to websocket
    this.socket = new WebSocket ("ws://localhost:3001");
    this.socket.onopen = () => console.log("Client connected here");
    this.socket.onmessage = (event) => {
    // The socket event data is encoded as a JSON string.
    // Turns it into an object
    const data = JSON.parse(event.data);
    switch(data.type) {
      case "userCountChange":
      this.setState({userCount: {count: data.userCount}});
      break;

      case "incomingMessage":
      this.messageFromServer(data);
      // handle incoming message
      break;

      case "incomingNotification":
      this.notificationFromServer(data);
      // handle incoming notification
      break;
      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + data.type);
      }
    };
  }

  // FUNCTIONS
  addUser(username) {
    this.setState({currentUser: {name: username}});
    const usernameObject = {
      type: "notiToServer",
      content: `${this.state.currentUser.name} changed their name to ${username}`
    }
    this.socket.send(JSON.stringify(usernameObject));
  }

  addMessage(message) {
    const messageObject = {
      type: "msgToServer",
      username: this.state.currentUser.name,
      content: message,
    }
    this.socket.send(JSON.stringify(messageObject));
  };

  messageFromServer  = (data) => {
    const message = data;
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages})
  };

  notificationFromServer  = (data) => {
    const notification = data;
    const notifications = this.state.messages.concat(notification);
    this.setState({messages: notifications})
  };

  // HTML to be rendered
  render() {
    return (
      <div>
        <Navbar userCount={this.state.userCount.count} />
        <MessageList messages  = {this.state.messages} />
        <ChatBar addUser = {this.addUser} addMessage = {this.addMessage} currentUser = {this.state.currentUser.name} />
      </div>
    );
  };
};