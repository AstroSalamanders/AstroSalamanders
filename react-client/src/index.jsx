import React from 'react';
import ReactDOM from 'react-dom';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import $ from 'jquery';
import Game from './components/Game.js';
import Landing from './components/Landing.js';
import PlayerTwo from './components/PlayerTwo.js';
// import { Swipeable, Holdable, defineHold, holdProgress, defineSwipe } from 'react-touch';
// import Touchscreen from './components/Touchscreen.js';
// import screenfull from 'screenfull';
import Controls from './components/Controls.js';
import initFastClick from 'react-fastclick';
initFastClick();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      test: '',
      socket: () => {},
      clientID: '',
      room: '',
      page: 'button',
      /* 
         the state of the app should live in the outmost component
         and be passed down through props.

         Everything that updates such as the 
         player + it's coords
         and boxes + their status + their coords should be here

         Since the blocks won't change, they could be a state of the board component itself
      */
      player: '',
      playerOne: { x: 33, y: 33, dir: 'down', frame: 1, alive: false },
      playerTwo: { x: 225, y: 417, dir: 'up', frame: 1, alive: false },
      bombNo: 0,
      bombs: [],
      flames: [],
      // alive: {playerOne: true, playerTwo: true},
      boxes: [ 
              { open: false, pos: { x: 96, y: 32 }},
              { open: false, pos: { x: 192, y: 32 }},
              { open: false, pos: { x: 160, y: 64 }},
              { open: false, pos: { x: 224, y: 64 }},
              { open: false, pos: { x: 32, y: 96 }},
              { open: false, pos: { x: 96, y: 96 }},
              { open: false, pos: { x: 160, y: 128 }},
              { open: false, pos: { x: 224, y: 128 }},
              { open: false, pos: { x: 32, y: 160 }},
              { open: false, pos: { x: 64, y: 160 }},
              { open: false, pos: { x: 128, y: 160 }},
              { open: false, pos: { x: 160, y: 192 }},
              { open: false, pos: { x: 32, y: 224 }},
              { open: false, pos: { x: 96, y: 224 }},
              { open: false, pos: { x: 224, y: 224 }},
              { open: false, pos: { x: 160, y: 256 }},
              { open: false, pos: { x: 64, y: 288 }},
              { open: false, pos: { x: 96, y: 288 }},
              { open: false, pos: { x: 160, y: 288 }},
              { open: false, pos: { x: 224, y: 288 }},
              { open: false, pos: { x: 32, y: 320 }},
              { open: false, pos: { x: 224, y: 320 }},
              { open: false, pos: { x: 32, y: 352 }},
              { open: false, pos: { x: 96, y: 352 }},
              { open: false, pos: { x: 160, y: 352 }},
              { open: false, pos: { x: 160, y: 384 }},
              { open: false, pos: { x: 64, y: 416 }},
              { open: false, pos: { x: 192, y: 416 }}
             ],
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
              ],
      winner: null

    };

    this.move = this.move.bind(this);
    this.canMove = this.canMove.bind(this);
    this.destroyBlock = this.destroyBlock.bind(this);
    this.destroyPlayer = this.destroyPlayer.bind(this);
    this.joinGameOnClick = this.joinGameOnClick.bind(this);
    this.swipeDirection = this.swipeDirection.bind(this);
    // this.test = this.test.bind(this);
  }

  componentDidMount(){
    // this.joinGameOnClick();
    // console.log("JOINED",this.state.clientID, this.state.room.toString() )
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
  }

  destroyPlayer(loc){
    // Takes target tile, currently checks if player is standing in destruction tile.
    // var playerRect = {x: this.state[this.state.player].x, y: this.state[this.state.player].y, width: 17, height: 29}
    // var destructRect = {x: loc.x, y:loc.y, width: 32, height: 32}

    // if(playerRect.x < destructRect.x + destructRect.width &&
    //   playerRect.x + playerRect.width > destructRect.x &&
    //   playerRect.y < destructRect.y + destructRect.height &&
    //   playerRect.y + playerRect.height > destructRect.y){
    //   // alert(this.state.player + 'dead');


    //   socket.emit()
    // }

    console.log('before ',this.state.playerOne.alive, this.state.playerTwo.alive, this.state.winner)
    var playerOneRect = {x: this.state.playerOne.x, y: this.state.playerOne.y, width: 17, height: 29}
    var playerTwoRect = {x: this.state.playerTwo.x, y: this.state.playerTwo.y, width: 17, height: 29}
    var destructRect = {x: loc.x, y:loc.y, width: 32, height: 32}

    if(playerOneRect.x < destructRect.x + destructRect.width &&
      playerOneRect.x + playerOneRect.width > destructRect.x &&
      playerOneRect.y < destructRect.y + destructRect.height &&
      playerOneRect.y + playerOneRect.height > destructRect.y){
      console.log('playerOne hit')

      this.setState({ playerOne: { alive: false } });
    }

    if(playerTwoRect.x < destructRect.x + destructRect.width &&
      playerTwoRect.x + playerTwoRect.width > destructRect.x &&
      playerTwoRect.y < destructRect.y + destructRect.height &&
      playerTwoRect.y + playerTwoRect.height > destructRect.y){
      console.log('Player two hit')

      this.setState( { playerTwo: { alive: false } } );
    }

    if(!this.state.playerOne.alive && !this.state.playerTwo.alive){
      this.setState({ winner: 'draw' });
    } else if (this.state.playerOne.alive && !this.state.playerTwo.alive){
      this.setState({ winner: 'player One' });
    } else if (!this.state.playerOne.alive && this.state.playerTwo.alive){
      this.setState({ winner: 'player Two' });
    }

    if(this.state.winner){
      // 1 REMOVE PLAYER
      console.log("WINNER! ",this.state.winner)
      // 2 SET TIMEOUT TO A FEW SECS AND reset
      // setTimeout(function(){
      //   this.state.reset()
      // }, 3000);
    }

      // console.log('after ', context.playerOne.alive, context.playerTwo.alive, context.winner)


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
        this.setState({ player: player });
        this.setState({ [this.state.player]: {  
            x: this.state[this.state.player].x, 
            y: this.state[this.state.player].y, 
            dir: 'down', 
            frame: 1, 
            alive: true 
          }
        });
        this.setState({
          page: 'game'
        })
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

    console.log("MOVING",dir);

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

        // function to center bombs
        let customFloor = (coord) => {
          return Math.round(coord/32) * 32
        }

        // increase bombNo
        this.setState({ bombNo: (this.state.bombNo + 1) });
       
        //create new bombs/update bomb state
        let newBomb = { 
                        x: customFloor(this.state[this.state.player].x), 
                        y: customFloor(this.state[this.state.player].y),
                        frame: 1,
                        id: this.state.bombNo
                      };

        let currentBombs = this.state.bombs;
        
        currentBombs.push(newBomb);

        this.setState({ bombs: currentBombs });

        // for this this inside timeouts
        var context = this;

        // animate bomb cookup
        var bombAnimation = function(id){
          return setInterval(function(){
            // change state on newbomb,
            // update state with currentBombs?

            // newBomb.frame = (newBomb.frame === 3) ? (3) : (newBomb.frame + 1);

            // update bomb frame getting bomb with id stored in closure
            let bombs = context.state.bombs.slice();
            let bomb = bombs.find((b) => b.id === id );
            bomb.frame = (bomb.frame === 3) ? (3) : (bomb.frame + 1);
            context.setState({ bombs: bombs });

          }, 800);
        }

        // explode bomb and remove
        var explosion = function(id){
          //when bomb explodes ( 3 secs ), set flames state
          setTimeout( ()=> {

            // remove animation before blowup
            clearInterval(bombAnim);

            console.log('BOOM!!!');

            // 1 make a copy of the current bombs
            let bombs = context.state.bombs.slice();

            // 2 find our bomb
            let bomb = bombs.find((b) => b.id === id );

            // -- do flames
            let flameTop = {x: bomb.x, y: bomb.y + 32}; 
            let flameLeft = {x: bomb.x - 32, y: bomb.y};
            let flameMid = {x: bomb.x, y: bomb.y};
            let flameRight = {x: bomb.x + 32, y: bomb.y};
            let flameBottom = {x: bomb.x, y: bomb.y - 32};

            // -- set flames
            context.setState({ flames: [flameTop, flameLeft, flameMid, flameRight, flameBottom] })

            // 3 remove it
            bombs.splice( bombs.indexOf(bomb), 1);

            // 4 update state
            context.setState({ bombs: bombs });


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

        // initiates bomb animation interval 
        // and creates a handle to it so we can remove it
        var bombAnim = bombAnimation(this.state.bombNo);

        // this setTimeout function removes the interval
        // and blows it up
        explosion(this.state.bombNo);

      }

  }

  canMove(dir){

    let step = 6;
    let player = $.extend({}, this.state[this.state.player]);
    let playerWidth = 20;
    let playerHeight = 28; 
    let boxsize = 30;

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
          return (this.state[this.state.player].y - (block.y + (boxsize-10))); 
        }

        else if ( dir === 'down' ){ 
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
            (player.x < (box.pos.x + (boxsize-2)))
            && 
            // player bottom
            ((player.y + playerHeight) > box.pos.y) 
            && 
            // player top
            (player.y < (box.pos.y + (boxsize-4))) 
          ){

        console.log("BOX COLLISION");

        let result;
        // use dir to return how the max we can move in that direction
        if ( dir === 'up' ){ 
          return (this.state[this.state.player].y - (box.pos.y + (boxsize-4))); }

        else if ( dir === 'down' ){ 
          return box.pos.y - (this.state[this.state.player].y + playerHeight); }

        else if ( dir === 'right' ){ 
          return box.pos.x - (this.state[this.state.player].x + playerWidth); }

        else if ( dir === 'left' ){ 
          return this.state[this.state.player].x - (box.pos.x + (boxsize-2)); }

      } 

    };

    // nothing stopped us, we can move full step
    return step; 

  }

  swipeDirection(direction) {
      console.log("SWIPED ", direction);

      this.setState({ 
        [this.state.player]: { 
          dir: direction, 
          frame: this.state[this.state.player].frame,
          x: this.state[this.state.player].x, 
          y: this.state[this.state.player].y  
        }
      });
  }



  render() {

    return (

    <div>

    {/* this.state.winner ? this.state.winner : 'No winner yet' */}
      
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
        
          <button onClick={this.joinGameOnClick}> Join Game Room </button>

      */}
          
      {/*Test Code 

          <button onClick={this.test}> test </button>

          <div id='test'>
            {this.state.test}
          </div>

          <div>
            <p>ClientID: {this.state.clientID}</p>
            <p>Room: {this.state.room.toString()}</p>
          </div> 

      { //console.log("P1 ",this.state.playerOne,"\n P2 ",this.state.playerTwo) 
    }
    {console.log(this.state.winner)}
          { console.log("P1 ",this.state.playerOne,"\n P2 ",this.state.playerTwo) }

      */}
        

      {/* <Touchscreen move={ this.move } /> */}

      { this.state.winner ? <h1 className="winner">{ this.state.winner.toUpperCase() } { this.state.winner === 'draw' ? '!' : 'WINS!' }</h1> : null }

      <Controls move={ this.move }/>

      { (this.state.page === 'game' ) ?  
            <Game playerOne={ this.state.playerOne } 
            playerTwo = { this.state.playerTwo }
            boxes={ this.state.boxes }
            blocks={ this.state.blocks } 
            flames={ this.state.flames }
            bombs={ this.state.bombs }/> 
            : 
            <Landing joinGameOnClick={this.joinGameOnClick}/>
      }

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

/*

  onSwipeTop={ () => this.swipeDirection('up') } 

  onSwipeRight={ () => this.swipeDirection('right') } 

  onSwipeBottom={ () => this.swipeDirection('down') } 

  onSwipeLeft={ () => this.swipeDirection('left') } 

*/

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