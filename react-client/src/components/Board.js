/* Board component ( under players, blocks, boxes ) bottom layer ( sibling on rendering container ) */
import React from 'react';
import Player from './Player.js'

class Board extends React.Component {

  constructor(props){
    super(props);
    // this.state { }
  }

  componentDidMount(){
    let height = $(document).height();
    let width = $(document).width();

    let Board = $('#Board');

    let boardHeight = 568;
    let boardWidth = 320;

    let topMargin = ((height - boardHeight) / 2);
    let leftMargin = ((width - boardWidth) / 2);

    $(Board).css({ top: topMargin, left: leftMargin });
    console.log("Board Margins left: %s top: %s", leftMargin, topMargin )

  }

  render(){
    return (

        <div id="Board">
          <Player/>
        </div>
    );
  }

}

export default Board;