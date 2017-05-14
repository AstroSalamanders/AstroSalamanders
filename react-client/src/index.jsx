import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, {KEYDOWN, KEYUP} from 'react-key-handler';
import $ from 'jquery';
import Game from './components/Game.js';
import PlayerTwo from './components/PlayerTwo.js'

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
      player: 'playerTwo',
      playerOne: { x: 33, y: 33, dir: 'down', frame: 1 },
      playerTwo: { x: 225, y: 417, dir: 'down', frame: 1 },
      boxes: [ { open: false, pos: { x: 64, y: 160 }} ],
      bombs: [],
      flames: [],
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
    this.destroyBlock = this.destroyBlock.bind(this);
    this.destroyPlayer = this.destroyPlayer.bind(this);

    this.joinGameOnClick = this.joinGameOnClick.bind(this);
    // this.test = this.test.bind(this);
  }

  componentDidMount(){
    // function to randomly place x amount of boxes
    this.joinGameOnClick();
    console.log("JOINED",this.state.clientID, this.state.room.toString() )
  }
  
  destroyBlock(loc){

    var newBoxesArray =  this.state.boxes.filter((box)=>{
      //console.log(box, loc, box.x, loc.x, box.y, loc.y)
      if(box.pos.x === loc.x && box.pos.y === loc.y){
        return false;
      } else {
        return true;
      }
    })
    //console.log(newBoxesArray)
    this.setState({boxes: newBoxesArray})
    this.destroyPlayer(loc)
  }

  destroyPlayer(loc){
    // Takes target tile, currently checks if player is standing in destruction tile.
    var playerRect = {x: this.state[this.state.player].x, y: this.state[this.state.player].y, width: 17, height: 29}
    var destructRect = {x: loc.x, y:loc.y, width: 32, height: 32}

    if(playerRect.x < destructRect.x + destructRect.width &&
      playerRect.x + playerRect.width > destructRect.x &&
      playerRect.y < destructRect.y + destructRect.height &&
      playerRect.y + playerRect.height > destructRect.y){
      alert('Player Dead!');
    }
  }

  joinGameOnClick () {
    var socket = io.connect('/');
    socket.on('onconnected', (data) => {
      console.log('connected successfuly to the socket.io server. My server side ID is ', data.id);
      socket.emit('join');
    });

    socket.on('room info', ({clientID, room, adapter, playerNumber}) => {
      console.log("clientID: ", clientID);
      console.log("room: ", room); 
      console.log("adapter: ", adapter); 
      console.log("player number:", playerNumber);
      this.setState({
        socket: socket,
        clientID: clientID,
        room: room
      })
      if(this.state.clientID === clientID){
        var player = playerNumber === 1 ? 'playerOne' : 'playerTwo'
        this.setState({player: player})
      }
    });

    socket.on('get test', ({test}) => {
      this.setState({
        test: test
      })
    });

    socket.on('update', (gameState)=>{
      //console.log(gameState.playerOne)
      this.setState(gameState)
    })
  }

  // test() {
  //   console.log('click');
  //   this.state.socket.emit('send test', {
  //     test: 'HELL YEAH I GET IT!!! ',
  //     room: this.state.room
  //   });
  //   this.setState({
  //     test: 'HELL YEAH I GET IT!!! ' + this.state.room
  //   })
  //   console.log(this.state)
  // }

  move(dir){

    // current way to directly send actions to server 
    this.state.socket.emit('action', {
      dir: dir,
      room: this.state.room,
      player: this.state.player
    })

    /*  
    frame switching logic:

        if dir !== current
          frame = 1
        else 
          if frame === 3
            frame -= 1 
          else
            frame += 1
    */

      if ( dir === 'up' ){

          // normal move
          this.setState({ 
            [this.state.player]: { 
              frame: (( dir !== this.state[this.state.player].dir ) ? 1 : 
                       (this.state[this.state.player].frame === 3) ? 
                       this.state[this.state.player].frame - 1 : 
                       this.state[this.state.player].frame + 1),
              dir: (dir === 'spacebar') ? this.state[this.state.player].dir : dir,
              x: this.state[this.state.player].x, 
              y: this.state[this.state.player].y - this.canMove(dir)
            }
          });

          console.log("DIR %s : %s",dir,this.state[this.state.player].dir)
      }


      else if ( dir === 'down' ){

          this.setState({ [this.state.player]: { 
            frame: (( dir !== this.state[this.state.player].dir ) ? 1 : 
                       (this.state[this.state.player].frame === 3) ? 
                       this.state[this.state.player].frame - 1 : 
                       this.state[this.state.player].frame + 1),
            dir: (dir === 'spacebar') ? this.state[this.state.player].dir : dir,
            x: this.state[this.state.player].x, 
            y: this.state[this.state.player].y + this.canMove(dir)
          } });

          console.log("DIR %s : %s",dir,this.state[this.state.player].dir)
      }


      else if ( dir === 'right' ){

          this.setState({ [this.state.player]: { 
            frame: (( dir !== this.state[this.state.player].dir ) ? 1 : 
                       (this.state[this.state.player].frame === 3) ? 
                       this.state[this.state.player].frame - 1 : 
                       this.state[this.state.player].frame + 1),
            dir: (dir === 'spacebar') ? this.state[this.state.player].dir : dir,
            x: this.state[this.state.player].x + this.canMove(dir), 
            y: this.state[this.state.player].y }
          });

          console.log("DIR %s : %s",dir,this.state[this.state.player].dir)
      }


      else if ( dir === 'left' ){

          this.setState({ [this.state.player]: { 
            frame: (( dir !== this.state[this.state.player].dir ) ? 1 : 
                       (this.state[this.state.player].frame === 3) ? 
                       this.state[this.state.player].frame - 1 : 
                       this.state[this.state.player].frame + 1),
            dir: (dir === 'spacebar') ? this.state[this.state.player].dir : dir,
            x: this.state[this.state.player].x - this.canMove(dir), 
            y: this.state[this.state.player].y }
          });

          console.log("DIR %s : %s",dir,this.state[this.state.player].dir)
      }

      else if ( dir === 'spacebar' ){

        //function to center bombs
        let customFloor = (coord) => {
          return Math.floor(coord/32) * 32
        }
       
        //create new bombs/update bomb state
        let newBomb = { 
                        x: customFloor(this.state[this.state.player].x), 
                        y: customFloor(this.state[this.state.player].y),
                        frame: 1 
                      };

        let currentBombs = this.state.bombs;
        
        currentBombs.push(newBomb);

        this.setState({ bombs: currentBombs });

        /*

          set interval for bomb, upon creation
          that animates bomb until it explodes
          remove interval on blowup function

        */

        // for this inside timeouts
        var context = this;

        var bombAnimation = function(){
          return setInterval(function(){
            // change state on newbomb,
            // update state with currentBombs?
            newBomb.frame = (newBomb.frame === 3) ? (1) : (newBomb.frame + 1);
            context.setState({ bombs: currentBombs });

          }, 1000);
        }

        var bombAnim = bombAnimation();

        
        //when bomb explodes ( 3 secs ), set flames state
        setTimeout( ()=> {

          // remove animation before blowup
          clearInterval(bombAnim);

          console.log('BOOM!!!');
          let flameTop = {x: newBomb.x, y: newBomb.y + 32}; 
          let flameLeft = {x: newBomb.x - 32, y: newBomb.y};
          let flameMid = {x: newBomb.x, y: newBomb.y};
          let flameRight = {x: newBomb.x + 32, y: newBomb.y};
          let flameBottom = {x: newBomb.x, y: newBomb.y - 32};

          context.setState({ flames: [flameTop, flameLeft, flameMid, flameRight, flameBottom] })
          context.setState({ bombs: context.state.bombs.splice(1) });
          
          context.state.flames.forEach((flame) => {
            context.destroyBlock(flame);
          })
          
          console.log('Flames state', context.state.flames);

          // disappear flames in 1 sec
          setTimeout( () => {
            context.setState({ flames: [] });
          }, 1000)


        }, 3000)

      }

      console.log("Switched dir to ",this.state[this.state.player].dir);
  }

  canMove(dir){

    let step = 6;
    let player = $.extend({}, this.state[this.state.player]);
    let playerWidth = 20;
    let playerHeight = 28; 
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
            (player.y < (block.y + (boxsize-10) )) 
          ){

        console.log("BLOCK COLLISION ",block);

        let result;
        // use dir to return how the max we can move in that direction
        if ( dir === 'up' ){ 

          console.log( player.y +" - ("+ block.y +" + "+ boxsize +") - "+ this.state[this.state.player].y);
          return (this.state[this.state.player].y - (block.y + (boxsize-10))); 
        }

        else if ( dir === 'down' ){ 
          console.log( (player.y + playerHeight)+" - "+ block.y);
          return block.y - (this.state[this.state.player].y + playerHeight); 
        }

        else if ( dir === 'right' ){ 
          return block.x - (this.state[this.state.player].x + playerWidth); 
        }

        else if ( dir === 'left' ){ 
          return this.state[this.state.player].x - (block.x + boxsize); 
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
        if ( dir === 'up' ){ return (this.state[this.state.player].y - (box.pos.y + boxsize)); }
        else if ( dir === 'down' ){ return box.pos.y - (this.state[this.state.player].y + playerHeight); }
        else if ( dir === 'right' ){ return box.pos.x - (this.state[this.state.player].x + playerWidth); }
        else if ( dir === 'left' ){ return this.state[this.state.player].x - (box.pos.x + boxsize); }

      } 

    };

    // nothing stopped us, we can move full step
    return step; 

  }





  render() {

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

     {/*Test Code


      <button onClick={this.destroyBlock}> DestroyBlock</button>
      <button onClick={this.destroyPlayer}> DestroyPlayer</button>
    
      <button onClick={this.joinGameOnClick}> Join Game Room </button>*/}
      
      {/*Test Code <button onClick={this.test}> test </button>

      <div id='test'>
        {this.state.test}
      </div>

      <div>
        <p>ClientID: {this.state.clientID}</p>
        <p>Room: {this.state.room.toString()}</p>
      </div> */}

      { console.log("P1 ",this.state.playerOne,"\n P2 ",this.state.playerTwo) }

      <Game playerOne={ this.state.playerOne } 
            playerTwo = { this.state.playerTwo }
            boxes={ this.state.boxes }
            blocks={ this.state.blocks } 
            flames={ this.state.flames }
            bombs={ this.state.bombs }/>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Helper function
// var customFloor = function(obj){
//   obj.x = Math.floor(obj.x / 32) * 32;
//   obj.y = Math.floor(obj.y / 32) * 32;
//   return obj;
// }


/*

Notes:

Refactored code for two players.
On joining game room, will set state to either player one or player two, in which case all functions and controls only apply to that player.


*Did not get second sprite to render, but change in position works. If you move 'PlayerTwo', the bomb location it drops will also drop

*/