import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message, username) {
    const messageObject = {
      username: this.state.currentUser.name,
      content: message,
      id: Math.random()
    }
    const messages = this.state.messages.concat(messageObject)
    this.setState({messages: messages})
    this.socket.send(JSON.stringify(messageObject));
  }

  componentDidMount() {
    // Connect to WebSockets server
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = function (event) {
      console.log("Connected to webSocket server.")
    };

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