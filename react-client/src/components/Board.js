/* Board component ( under players, blocks, boxes ) bottom layer ( sibling on rendering container ) */
import React from 'react';

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

    let topmargin = ((height - boardHeight) / 2);
    let leftMargin = ((width - boardWidth) / 2);

    $(Board).css({ top: topmargin, left: leftMargin });

  }

  render(){
    return (

        <div id="Board">
          BOARD
        </div>
    );
  }

}

export default Board;