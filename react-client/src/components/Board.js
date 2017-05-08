/* Board component ( under players, blocks, boxes ) bottom layer ( sibling on rendering container ) */
import React from 'react';
import Player from './Player.js';
import Box from './Box.js';
import Block from './Block.js';


class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {  blocks: [
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
                            ]}
  }

  componentDidMount(){
    let height = $(document).height();
    let width = $(document).width();

    console.log("Doc Height: %s, Width: %s", height, width)
    let Board = $('#Board');

    let boardHeight = 480;
    let boardWidth = 288;

    let topMargin = ((height - boardHeight) / 2);
    let leftMargin = ((width - boardWidth) / 2);

    $(Board).css({ top: topMargin, left: leftMargin });
    console.log("Board Margins left: %s top: %s", leftMargin, topMargin )

  }

  render(){
    return (

        <div id="Board">

          <Player pos={ this.props.player } />
          
          { this.props.boxes.map( (box,x) => 
            <Box key={x} open={box.open} pos={box.pos} /> ) }

          { this.state.blocks.map( (block,x) => 
            <Block key={x} pos={block} /> ) }

        </div>
    );
  }

}

export default Board;