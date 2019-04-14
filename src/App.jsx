import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] // messages from server stored here.
    }
    this.addMessage = this.addMessage.bind(this);
    this.messageHandler = this.messageHandler.bind(this);
  }

  addMessage(message, username) {
    const messageObject = {
      username: this.state.currentUser.name,
      content: message,
    }
    this.socket.send(JSON.stringify(messageObject));
  }

  messageHandler(event) {
    const message = JSON.parse(event.data);
    const messages = this.state.messages.concat(message);
    this.setState({messages: messages})
  }

  componentDidMount() {
    // Connect to WebSockets server
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = function (event) {
      console.log("Connected to webSocket server.")
    };
    this.socket.onmessage = this.messageHandler;

  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;