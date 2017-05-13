var _ = require('underscore');

var Game = function(roomid){
  this.playerOne = { x: 33, y: 33, dir: 'down', frame: 1 };
  this.playerTwo = { x: 225, y: 417, dir: 'down' };
  this.boxes = [ { open: false, pos: { x: 64, y: 160 }} ];
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
              ]
}

Game.prototype.destroyBlock = (loc, player, context) => {
    console.log("destroyBlocks's this", context);
    var newBoxesArray = context.boxes.filter((box)=>{
      //console.log(box, loc, box.x, loc.x, box.y, loc.y)
      if(box.pos.x === loc.x && box.pos.y === loc.y){
        return false;
      } else {
        return true;
      }
    })
    console.log(newBoxesArray)
    context.boxes = newBoxesArray;
    context.destroyPlayer(loc, player, context)
  }

Game.prototype.destroyPlayer = (loc, player, context) => {
    // Takes target tile, currently checks if player is standing in destruction tile.
    var playerRect = {x: context[player].x, y: context[player].y, width: 17, height: 29}
    var destructRect = {x: loc.x, y:loc.y, width: 32, height: 32}

    if(playerRect.x < destructRect.x + destructRect.width &&
      playerRect.x + playerRect.width > destructRect.x &&
      playerRect.y < destructRect.y + destructRect.height &&
      playerRect.y + playerRect.height > destructRect.y){
    }
  }

Game.prototype.move = function(dir, player){

    // set sprite direction
    // if (dir !== 'spacebar'){
    //   this[player].dir = dir;
    // }

    console.log("Server Player Dir: ", this[player].dir)
    if ( dir === 'up' ){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x,
        y: this[player].y - canMove(dir, player, this)

      }
    } else if(dir ==='down'){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x,
        y: this[player].y + canMove(dir, player, this)
      }
    } else if(dir ==='right'){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x + canMove(dir, player, this),
        y: this[player].y
      }
    } else if(dir ==='left'){
      this[player] = {
        frame: (( dir !== this[player].dir ) ? 1 : 
                       (this[player].frame === 3) ? 
                        this[player].frame - 1 : 
                        this[player].frame + 1),
        dir: dir,
        x: this[player].x - canMove(dir, player, this),
        y: this[player].y
      }
    } else if ( dir === 'spacebar' ){
        //function to center bombs
        let customFloor = (coord) => {
          return Math.floor(coord/32) * 32;
        }
       
        //create new bombs/update bomb state
        let newBomb = { x: customFloor(this[player].x), y: customFloor(this[player].y) };
        let currentBombs = this.bombs;
        currentBombs.push(newBomb);

        this.bombs = currentBombs;
        
        //when bomb explodes, set flames state
        setTimeout( ()=> {
          console.log('BOOM!!!');
          let flameTop = {x: newBomb.x, y: newBomb.y + 32}; 
          let flameLeft = {x: newBomb.x - 32, y: newBomb.y};
          let flameMid = {x: newBomb.x, y: newBomb.y};
          let flameRight = {x: newBomb.x + 32, y: newBomb.y};
          let flameBottom = {x: newBomb.x, y: newBomb.y - 32};

          this.flames = [flameTop, flameLeft, flameMid, flameRight, flameBottom];
          this.bombs = this.bombs.splice(1);
          
          this.flames.forEach((flame) => {
            this.destroyBlock(flame, player, this);
          })
          
          console.log('Flames state', this.flames);

          setTimeout( () => {
            this.flames = [];
          }, 1000)

        }, 3000)

      }

}

var canMove = function (dir, playerNumber, object){

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

  let step = 6;
  let player = _.extend({}, object[playerNumber]);
  let playerWidth = 20;
  let playerHeight = 28; 
  let boxsize = 32;

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

      console.log("BLOCK COLLISION");

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
      if ( dir === 'up' ){ return (player.y - (box.pos.y + boxsize)); }
      else if ( dir === 'down' ){ return box.pos.y - (player.y + playerHeight); }
      else if ( dir === 'right' ){ return box.pos.x - (player.x + playerWidth); }
      else if ( dir === 'left' ){ return player.x - (box.pos.x + boxsize); }

    } 

  };

  // nothing stopped us, we can move full step
  return step; 
}

module.exports = Game;