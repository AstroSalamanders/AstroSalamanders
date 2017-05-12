var _ = require('underscore');

var Game = function(roomid){
  this.playerOne = {x: 33, y: 33};
  this.playerTwo = {x: 225, y: 417};
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


Game.prototype.move = function(dir, player){

    if ( dir === 'up' ){
      this[player] = {
        x: this[player].x,
        y: this[player].y - canMove(dir, player, this)
      }
    } else if(dir ==='down'){
      this[player] = {
        x: this[player].x,
        y: this[player].y + canMove(dir, player, this)
      }
    } else if(dir ==='right'){
      this[player] = {
        x: this[player].x + canMove(dir, player, this),
        y: this[player].y
      }
    } else if(dir ==='left'){
      this[player] = {
        x: this[player].x - canMove(dir, player, this),
        y: this[player].y
      }
    }
      console.log(this[player])

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

  let step = 5;
  let player = _.extend({}, object[playerNumber]);
  let playerWidth = 17;
  let playerHeight = 29; 
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
          (player.y < (block.y + boxsize)) 
        ){

      console.log("BOX COLLISION");

      let result;
      // use dir to return how the max we can move in that direction
      if ( dir === 'up' ){ 
        console.log( player.y +" - ("+ block.y +" + "+ boxsize +") - "+ player.y);
        return (player.y - (block.y + boxsize)); 
      }

      else if ( dir === 'down' ){ 
        console.log( (player.y + playerHeight)+" - "+ block.y);
        return block.y - (player.y + playerHeight); 
      }

      else if ( dir === 'right' ){ 
        return block.x - (player.x + playerWidth); 
      }

      else if ( dir === 'left' ){ 
        return player.x - (block.x + boxsize); 
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
  console.log(step)
  return step; 
}

module.exports = Game;