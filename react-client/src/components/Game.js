/* Main container for the game */

import React from 'react';
import Board from './Board.js';

class Game extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    let height = $(document).height();
    let width = $(document).width();
    let Game = $('#Game');

    $(Game).css({ width: width,
                  height: height,
                  minWidth: width, 
                  minHeight: height
                });

    // console.log("Game w: %s h: %s", width, height )

  }


  render(){
    return( 
        <div id="Game">
          <Board player={ this.props.player }
                 playerTwo = { this.props.playerTwo }
                 boxes={ this.props.boxes }
                 blocks={ this.props.blocks } 
                 bombs={ this.props.bombs }
                 flames={ this.props.flames }/>
        }

        </div>

    );
  }

}

export default Game;