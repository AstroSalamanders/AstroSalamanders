import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import KeyHandler, {KEYDOWN, KEYUP} from 'react-key-handler';

import Game from './components/Game.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      test: '',
      socket: () => {},
      clientID: '',
      room: '',

      /* 
         the state of the app should live in the outmost component
         and be passed down through props.

         Everything that updates such as the 
         player + it's coords
         and boxes + their status + their coords should be here

         Since the blocks won't change, they could be a state of the board component itself
      */

      player: { x: 32, y: 32 },
      boxes: [ { open: false, pos: { x: 64, y: 160 }} ]
    };

    this.move = this.move.bind(this);

    this.newGame1OnClick = this.newGame1OnClick.bind(this);
    this.newGame2OnClick = this.newGame2OnClick.bind(this);
    this.joinGame1OnClick = this.joinGame1OnClick.bind(this);
    this.joinGame2OnClick = this.joinGame2OnClick.bind(this);
    this.test = this.test.bind(this);
  }

  onComponentDidMount(){

    // function to randomly place x amount of boxes
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



  move(dir){

    /* Board size width: 288px; height: 480px; */

    let step = 9;
    let playerWidth = 32;

    if ( dir === 'up' ){

      // if it'll not leave the canvas
      if ( this.state.player.y - step >= 0 ){
        // check for collision aswell
        this.setState({ player: { x: this.state.player.x, y: this.state.player.y - step } });
      }

    }

    if ( dir === 'down' ){
        
      // if it'll not leave the canvas
      if ( this.state.player.y + step <= (480 - playerWidth) ){
        // check for collision aswell
        this.setState({ player: { x: this.state.player.x, y: this.state.player.y + step } });
      }

    }

    if ( dir === 'right' ){
      
      // if it'll not leave the canvas
      if ( this.state.player.x + step <= (288 - playerWidth) ){
        // check for collision aswell
        this.setState({ player: { x: this.state.player.x + step, y: this.state.player.y } });
      }

    }

    if ( dir === 'left' ){
      
      // if it'll not leave the canvas
      if ( this.state.player.x - step >= 0 ){
        // check for collision aswell
        this.setState({ player: { x: this.state.player.x - step, y: this.state.player.y } });
      }

    }

    if ( dir === 'spacebar' ){
      alert("BOOM!");
    }
    // this.state.player
  }


  render() {

    console.log("Rendering APP")
    return (


    <div>

      <KeyHandler keyEventName='keydown'  
                  keyValue="ArrowUp"
                  onKeyHandle={ (e) => this.move("up") } />

      <KeyHandler keyEventName='keydown'  
                  keyValue="ArrowDown"
                  onKeyHandle={ (e) => this.move('down') } />

      <KeyHandler keyEventName='keydown'  
                  keyValue="ArrowLeft"
                  onKeyHandle={ (e) => this.move('left') } />

      <KeyHandler keyEventName='keydown'  
                  keyValue="ArrowRight"
                  onKeyHandle={ (e) => this.move('right') } />

      <KeyHandler keyEventName='keyup' 
                  keyValue=" "
                  onKeyHandle={ (e) => this.move('spacebar') } />

    {/* This code is Jack's Game Room Test

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

    */}

      <Game player={ this.state.player } 
            boxes={ this.state.boxes } />

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));