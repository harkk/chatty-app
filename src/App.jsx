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
    const webSocket = new WebSocket('ws://localhost:3001');
    webSocket.onopen = function (event) {
      console.log("Connected to webSocket server.")
    };

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
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