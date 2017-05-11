/* Board component ( under players, blocks, boxes ) bottom layer ( sibling on rendering container ) */
import React from 'react';
import Player from './Player.js';
import Box from './Box.js';
import Block from './Block.js';
import Bomb from './Bomb.js';
import Flame from './Flame.js';


class Board extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let height = $(document).height();
    let width = $(document).width();

    // console.log("Doc Height: %s, Width: %s", height, width)
    let Board = $('#Board');

    let boardHeight = 480;
    let boardWidth = 288;

    let topMargin = ((height - boardHeight) / 2);
    let leftMargin = ((width - boardWidth) / 2);

    $(Board).css({ top: topMargin, left: leftMargin });
    // console.log("Board Margins left: %s top: %s", leftMargin, topMargin )

  }

  render(){

    return (

        <div id="Board">

          <Player pos={ this.props.player } />

          { this.props.flames.map( (flame,x) =>
            <Flame key = {x} pos={{x: flame.x, y: flame.y}}  /> ) }

          { this.props.bombs.map( (bomb,x) =>
            <Bomb key = {x} pos={{x: bomb.x, y: bomb.y}}  /> ) }
          
          { this.props.boxes.map( (box,x) => 
            <Box key={x} open={box.open} pos={box.pos} /> ) }

          { this.props.blocks.map( (block,x) => 
            <Block key={x} pos={block} /> ) }

        </div>
    );
  }

}

export default Board;