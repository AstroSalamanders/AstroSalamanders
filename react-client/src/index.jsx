import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Game from './components/Game.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      test: '',
      socket: () => {},
      clientID: '',
      room: ''
    };

    this.newGame1OnClick = this.newGame1OnClick.bind(this);
    this.newGame2OnClick = this.newGame2OnClick.bind(this);
    this.joinGame1OnClick = this.joinGame1OnClick.bind(this);
    this.joinGame2OnClick = this.joinGame2OnClick.bind(this);
    this.test = this.test.bind(this);
  }

  newGame1OnClick () {
    var socket = io.connect('/');
    socket.on('onconnected', (data) => {
      console.log('connected successfuly to the socket.io server. My server side ID is ', data.id);
      socket.emit('create', 'room1');
    });

    socket.on('room info', ({clientID, adapter}) => {
      console.log("clientID: ",clientID); //client id
      console.log("adapter: ",adapter); //data.adapter.room1 || data.adapter.room2
      this.setState({
        socket: socket,
        room: 'room1',
        clientID: clientID
      })
    });

    socket.on('get test', ({test, room}) => {
      if (room === this.state.room){
        this.setState({
          test: test
        })
      }
    });

  }

  newGame2OnClick () {
    var socket = io.connect('/');
    socket.on('onconnected', (data) => {
      console.log('connected successfuly to the socket.io server. My server side ID is ', data.id);
      socket.emit('create', 'room2');
    });

    socket.on('room info', ({clientID, adapter}) => {
      console.log("clientID: ",clientID); //client id
      console.log("adapter: ",adapter); //data.adapter.room1 || data.adapter.room2
      this.setState({
        socket: socket,
        room: 'room2',
        clientID: clientID
      })
    });

    socket.on('get test', ({test, room}) => {
      if (room === this.state.room){
        this.setState({
          test: test
        })
      }
    });
  }

  joinGame1OnClick () {
    var socket = io.connect('/');
    socket.on('onconnected', (data) => {
      console.log('connected successfuly to the socket.io server. My server side ID is ', data.id);
      socket.emit('join', 'room1');
    });

    socket.on('room info', ({clientID, adapter}) => {
      console.log("clientID: ",clientID); //client id
      console.log("adapter: ",adapter); //data.adapter.room1 || data.adapter.room2
      this.setState({
        socket: socket,
        room: 'room1',
        clientID: clientID
      })
    });

    socket.on('get test', ({test, room}) => {
      if (room === this.state.room){
        this.setState({
          test: test
        })
      }
    });
  }

  joinGame2OnClick () {
    var socket = io.connect('/');
    socket.on('onconnected', (data) => {
      console.log('connected successfuly to the socket.io server. My server side ID is ', data.id);
      socket.emit('join', 'room2');
    });

    socket.on('room info', ({clientID, adapter}) => {
      console.log("clientID: ",clientID);
      console.log("adapter: ",adapter);
      this.setState({
        socket: socket,
        room: 'room2',
        clientID: clientID
      })
    });

    socket.on('get test', ({test, room}) => {
      if (room === this.state.room){
        this.setState({
          test: test
        })
      }
    });
  }

  test() {
    console.log('click');
    this.state.socket.emit('send test', {
      test: 'HELL YEAH I GET IT!!!',
      room: this.state.room
    });
    this.setState({
      test: 'HELL YEAH I GET IT!!!'
    })

  }

  render() {
    return (
    <div>

      <button onClick={this.newGame1OnClick}> New Game room 1</button>
      <button onClick={this.newGame2OnClick}> New Game room 2</button>
      <br></br>
      <button onClick={this.joinGame1OnClick}> Join Game room 1</button>
      <button onClick={this.joinGame2OnClick}> Join Game room 2</button>
      <br></br>
      <button onClick={this.test}> test </button>

      <div id='test'>
        {this.state.test}
      </div>
      <div>
        <p>{JSON.stringify(this.state.clientID)}</p>
        <p>{this.state.room.toString()}</p>
      </div>

      <Game />

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));