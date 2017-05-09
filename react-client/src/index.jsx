import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, {KEYDOWN, KEYUP} from 'react-key-handler';
import $ from 'jquery';
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

      player: { x: 33, y: 33 },
      boxes: [ { open: false, pos: { x: 64, y: 160 }} ],
      blocks: [  
                // top edge
                { x: 0, y: 0 },
                { x: 32, y: 0 },
                { x: 64, y: 0 },
                { x: 96, y: 0 },
                { x: 128, y: 0 },
                { x: 160, y: 0 },
                { x: 192, y: 0 },
                { x: 224, y: 0 },
                { x: 256, y: 0 },

                //right edge
                { x: 256, y: 32 },
                { x: 256, y: 64 },
                { x: 256, y: 96 },
                { x: 256, y: 128 },
                { x: 256, y: 160 },
                { x: 256, y: 192 },
                { x: 256, y: 224 },
                { x: 256, y: 256 },
                { x: 256, y: 288 },
                { x: 256, y: 320 },
                { x: 256, y: 352 },
                { x: 256, y: 384 },
                { x: 256, y: 416 },
                { x: 256, y: 448 },

                // bottom edge
                { x: 224, y: 448 },
                { x: 192, y: 448 },
                { x: 160, y: 448 },
                { x: 128, y: 448 },
                { x: 96, y: 448 },
                { x: 64, y: 448 },
                { x: 32, y: 448 },
                { x: 0, y: 448 },

                //left edge
                { x: 0, y: 32 },
                { x: 0, y: 64 },
                { x: 0, y: 96 },
                { x: 0, y: 128 },
                { x: 0, y: 160 },
                { x: 0, y: 192 },
                { x: 0, y: 224 },
                { x: 0, y: 256 },
                { x: 0, y: 288 },
                { x: 0, y: 320 },
                { x: 0, y: 352 },
                { x: 0, y: 384 },
                { x: 0, y: 416 },
                { x: 0, y: 448 },

                // inside blocks
                { x: 64, y: 64},
                { x: 128, y: 64},
                { x: 192, y: 64},
                { x: 64, y: 128},
                { x: 128, y: 128},
                { x: 192, y: 128},
                { x: 64, y: 192},
                { x: 128, y: 192},
                { x: 192, y: 192},
                { x: 64, y: 256},
                { x: 128, y: 256},
                { x: 192, y: 256},
                { x: 64, y: 320},
                { x: 128, y: 320},
                { x: 192, y: 320},
                { x: 64, y: 384},
                { x: 128, y: 384},
                { x: 192, y: 384},
              ]
    };

    this.move = this.move.bind(this);
    this.canMove = this.canMove.bind(this);


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

  canMove(dir){

    /*
        Go through each block and box,
        check if we can move there or not
        if we can move return false
        if we cant return true

        this ==> App ( this.state able )

        Board size 
        width: 288px 
        height: 480px
    */

    let step = 5;
    let player = $.extend({}, this.state.player);
    let playerWidth = 17;
    let playerHeight = 29; 
    let boxsize = 32;

    // first get what would be updated player coord
    if ( dir === 'up' ){ player.y -= step; }
    else if ( dir === 'down' ){ player.y += step; }
    else if ( dir === 'right' ){ player.x += step; }
    else if ( dir === 'left' ){ player.x -= step; }


    // BLOCK COLLISION
    for ( let n = 0; n < this.state.blocks.length; n++ ){

      let block = this.state.blocks[n];

      // if collition with a block
      if  ( 
            // if player's right side
            ((player.x + playerWidth) > block.x)  
            &&
            // if player's left side
            (player.x < (block.x + boxsize))
            && 
            // player bottom
            ((player.y + playerHeight) > block.y) 
            && 
            // player top
            (player.y < (block.y + boxsize)) 
          ){

        console.log("BOX COLLISION");

        let result;
        // use dir to return how the max we can move in that direction
        if ( dir === 'up' ){ 
          console.log( player.y +" - ("+ block.y +" + "+ boxsize +") - "+ this.state.player.y);
          return (this.state.player.y - (block.y + boxsize)); 
        }

        else if ( dir === 'down' ){ 
          console.log( (player.y + playerHeight)+" - "+ block.y);
          return block.y - (this.state.player.y + playerHeight); 
        }

        else if ( dir === 'right' ){ 
          return block.x - (this.state.player.x + playerWidth); 
        }

        else if ( dir === 'left' ){ 
          return this.state.player.x - (block.x + boxsize); 
        }

      } 

    };

    // BOX COLLISION
    for ( let n = 0; n < this.state.boxes.length; n++ ){

      let box = this.state.boxes[n];

      // if collition with a box
      if  ( 
            // if player's right side
            ((player.x + playerWidth) > box.pos.x)  
            &&
            // if player's left side
            (player.x < (box.pos.x + boxsize))
            && 
            // player bottom
            ((player.y + playerHeight) > box.pos.y) 
            && 
            // player top
            (player.y < (box.pos.y + boxsize)) 
          ){

        console.log("BOX COLLISION");

        let result;
        // use dir to return how the max we can move in that direction
        if ( dir === 'up' ){ return (this.state.player.y - (box.pos.y + boxsize)); }
        else if ( dir === 'down' ){ return box.pos.y - (this.state.player.y + playerHeight); }
        else if ( dir === 'right' ){ return box.pos.x - (this.state.player.x + playerWidth); }
        else if ( dir === 'left' ){ return this.state.player.x - (box.pos.x + boxsize); }

      } 

    };

    // nothing stopped us, we can move full step
    return step; 

  }

  move(dir){

      if ( dir === 'up' ){

          // normal move
          this.setState({ player: { 
            x: this.state.player.x, 
            y: this.state.player.y - this.canMove(dir) } 
          });

      }


      else if ( dir === 'down' ){

          this.setState({ player: { 
            x: this.state.player.x, 
            y: this.state.player.y + this.canMove(dir) 
          } });

      }


      else if ( dir === 'right' ){

          this.setState({ player: { 
            x: this.state.player.x + this.canMove(dir), 
            y: this.state.player.y } 
          });

      }


      else if ( dir === 'left' ){

          this.setState({ player: { 
            x: this.state.player.x - this.canMove(dir), 
            y: this.state.player.y } 
          });

      }

      else if ( dir === 'spacebar' ){
        alert("BOOM!");
      }

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
            boxes={ this.state.boxes }
            blocks={ this.state.blocks } />

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));