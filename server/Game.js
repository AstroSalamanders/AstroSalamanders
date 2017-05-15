var _ = require('underscore');

var Game = function(roomid){
  this.playerOne = { x: 33, y: 33, dir: 'down', frame: 1, alive:true };
  this.playerTwo = { x: 225, y: 417, dir: 'up', frame: 1, alive: true };
  this.boxes = [ 
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
  ];
  this.bombNo = 0;
  this.bombs = [];
  this.flames = [];
  this.blocks = [  
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
  ],
  this.winner = null;
}

Game.prototype.destroyBlock = (loc, player, context) => {
    //console.log("destroyBlocks's this", context);
    var newBoxesArray = context.boxes.filter((box)=>{
      //console.log(box, loc, box.x, loc.x, box.y, loc.y)
      if(box.pos.x === loc.x && box.pos.y === loc.y){
        return false;
      } else {
        return true;
      }
    })
    //console.log(newBoxesArray)
    context.boxes = newBoxesArray;
    console.log(context)
    context.destroyPlayer(loc, context)
  }

Game.prototype.destroyPlayer = (loc, context) => {
    // Takes target tile, currently checks if player is standing in destruction tile.
          console.log('before ',context.playerOne.alive, context.playerTwo.alive, context.winner)
    var playerOneRect = {x: context.playerOne.x, y: context.playerOne.y, width: 17, height: 29}
    var playerTwoRect = {x: context.playerTwo.x, y: context.playerTwo.y, width: 17, height: 29}
    var destructRect = {x: loc.x, y:loc.y, width: 32, height: 32}

    if(playerOneRect.x < destructRect.x + destructRect.width &&
      playerOneRect.x + playerOneRect.width > destructRect.x &&
      playerOneRect.y < destructRect.y + destructRect.height &&
      playerOneRect.y + playerOneRect.height > destructRect.y){
      console.log('playerOne hit')
      context.playerOne.alive = false;
    }
    if(playerTwoRect.x < destructRect.x + destructRect.width &&
      playerTwoRect.x + playerTwoRect.width > destructRect.x &&
      playerTwoRect.y < destructRect.y + destructRect.height &&
      playerTwoRect.y + playerTwoRect.height > destructRect.y){
      console.log('Player two hit')
      context.playerTwo.alive = false
    }
    if(!context.playerOne.alive && !context.playerTwo.alive){
      context.winner = 'draw'
    } else if (context.playerOne.alive && !context.playerTwo.alive){
      context.winner = 'playerOne'
    } else if (!context.playerOne.alive && context.playerTwo.alive){
      context.winner = 'playerTwo'
    }
      console.log('after ', context.playerOne.alive, context.playerTwo.alive, context.winner)
  }

Game.prototype.move = function(dir, player){

    // set sprite direction
    // if (dir !== 'spacebar'){
    //   this[player].dir = dir;
    // }

    //console.log("Server Player Dir: ", this[player].dir)
    if ( dir === 'up' ){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x,
        y: this[player].y - canMove(dir, player, this),
        alive: this[player].alive

      }
    } else if(dir ==='down'){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x,
        y: this[player].y + canMove(dir, player, this),
        alive: this[player].alive
      }
    } else if(dir ==='right'){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x + canMove(dir, player, this),
        y: this[player].y,
        alive: this[player].alive
      }
    } else if(dir ==='left'){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x - canMove(dir, player, this),
        y: this[player].y,
        alive: this[player].alive
      }
    } else if ( dir === 'spacebar' ){
        
        // function to center bombs
        let customFloor = (coord) => {
          return Math.round(coord/32) * 32
        }

        // increase bombNo
        this.bombNo += 1;
       
        //create new bombs/update bomb state
        let newBomb = { 
                        x: customFloor(this[player].x), 
                        y: customFloor(this[player].y),
                        frame: 1,
                        id: this.bombNo
                      };

        let currentBombs = this.bombs;
        
        currentBombs.push(newBomb);

        this.bombs = currentBombs;

        // for this this inside timeouts
        var context = this;

        // animate bomb cookup
        var bombAnimation = function(id){
          return setInterval(function(){
            // change state on newbomb,
            // update state with currentBombs?

            // newBomb.frame = (newBomb.frame === 3) ? (3) : (newBomb.frame + 1);

            // update bomb frame getting bomb with id stored in closure
            let bombs = context.bombs.slice();
            let bomb = bombs.find((b) => b.id === id );
            bomb.frame = (bomb.frame === 3) ? (3) : (bomb.frame + 1);
            context.bombs = bombs;

          }, 800);
        }

        // explode bomb and remove
        var explosion = function(id){
          //when bomb explodes ( 3 secs ), set flames state
          setTimeout( ()=> {

            // remove animation before blowup
            clearInterval(bombAnim);

            //console.log('BOOM!!!');

            // 1 make a copy of the current bombs
            let bombs = context.bombs.slice();

            // 2 find our bomb
            let bomb = bombs.find((b) => b.id === id );

            // -- do flames
            let flameTop = {x: bomb.x, y: bomb.y + 32}; 
            let flameLeft = {x: bomb.x - 32, y: bomb.y};
            let flameMid = {x: bomb.x, y: bomb.y};
            let flameRight = {x: bomb.x + 32, y: bomb.y};
            let flameBottom = {x: bomb.x, y: bomb.y - 32};

            // -- set flames
            context.flames = [flameTop, flameLeft, flameMid, flameRight, flameBottom];

            // 3 if we find it, remove it
            bombs.splice( bombs.indexOf(bomb), 1);

            // 4 update bombs state
            context.bombs = bombs;

            context.flames.forEach((flame) => {
              context.destroyBlock(flame, player, context);
            })
            
            //console.log('Flames state', context.flames);

            // disappear flames in 1 sec
            setTimeout( () => {
              // this looks like it can give problems with multiple bombs
              // blowing up at once ( altho unlikely it happens, it could )
              context.flames = [];
            }, 1000)


          }, 3000)
        }

        // initiates bomb animation interval 
        // and creates a handle to it so we can remove it
        var bombAnim = bombAnimation(this.bombNo);

        // this setTimeout function removes the interval
        // and blows it up
        explosion(this.bombNo);

      }


}

Game.prototype.reset = function(context){
  this.playerOne = { x: 33, y: 33, dir: 'down', frame: 1, alive: true };
  this.playerTwo = { x: 225, y: 417, dir: 'up', frame: 1, alive: true };
  this.boxes = [ 
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
            ];
  this.bombNo = 0;
  this.bombs = [];
  this.flames = [];
  this.blocks = [  
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
              ],
              this.winner = null
}

var canMove = function (dir, playerNumber, object){

  let step = 6;
  let player = _.extend({}, object[playerNumber]);
  let playerWidth = 20;
  let playerHeight = 28; 
  let boxsize = 30;

  // first get what would be updated player coord
  if ( dir === 'up' ){ player.y -= step; }
  else if ( dir === 'down' ){ player.y += step; }
  else if ( dir === 'right' ){ player.x += step; }
  else if ( dir === 'left' ){ player.x -= step; }


  // BLOCK COLLISION
  for ( let n = 0; n < object.blocks.length; n++ ){

    let block = object.blocks[n];

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
          (player.y < (block.y + (boxsize - 10))) 
        ){

      //console.log("BLOCK COLLISION");

      let result;
      // use dir to return how the max we can move in that direction
      if ( dir === 'up' ){ 
        return (player.y + step - (block.y + (boxsize-10))); }

      else if ( dir === 'down' ){ 
        return block.y - (player.y - step + playerHeight); 
      }

      else if ( dir === 'right' ){ 
        return block.x - (player.x - step + playerWidth); 
      }

      else if ( dir === 'left' ){ 
        return player.x + step - (block.x + boxsize); 
      }

    } 

  };

  // BOX COLLISION
  for ( let n = 0; n < object.boxes.length; n++ ){

    let box = object.boxes[n];

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
      if ( dir === 'up' ){ return (player.y - (box.pos.y + (boxsize - 4))); }
      else if ( dir === 'down' ){ return box.pos.y - (player.y + playerHeight); }
      else if ( dir === 'right' ){ return box.pos.x - (player.x + playerWidth); }
      else if ( dir === 'left' ){ return player.x - (box.pos.x + (boxsize-2)); }

    } 

  };

  // nothing stopped us, we can move full step
  return step; 
}

module.exports = Game;