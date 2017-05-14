/*
  
  Block component [ the walls that don't break ] 
  ( sibling to player, boxes ) top layer

*/
import React from 'react';

class Block extends React.Component{

  constructor(props){
    super(props);
  }


  render(){
    return( 

        <div className={ `block 

          ${ (this.props.pos.y === 0 && this.props.pos.x != 0 && this.props.pos.x !== 256) ? "bfront" : 
             (this.props.pos.y === 448 ) ? "bfront" : 
             ((this.props.pos.x === 64 && this.props.pos.y === 64 )  || 
              (this.props.pos.x === 128 && this.props.pos.y === 64)  || 
              (this.props.pos.x === 192 && this.props.pos.y === 64)  || 
              (this.props.pos.x === 64 && this.props.pos.y === 128)  || 
              (this.props.pos.x === 128 && this.props.pos.y === 128) || 
              (this.props.pos.x === 192 && this.props.pos.y === 128) || 
              (this.props.pos.x === 64 && this.props.pos.y === 192)  || 
              (this.props.pos.x === 128 && this.props.pos.y === 192) || 
              (this.props.pos.x === 192 && this.props.pos.y === 192) || 
              (this.props.pos.x === 64 && this.props.pos.y === 256)  || 
              (this.props.pos.x === 128 && this.props.pos.y === 256) || 
              (this.props.pos.x === 192 && this.props.pos.y === 256) || 
              (this.props.pos.x === 64 && this.props.pos.y === 320)  || 
              (this.props.pos.x === 128 && this.props.pos.y === 320) || 
              (this.props.pos.x === 192 && this.props.pos.y === 320) || 
              (this.props.pos.x === 64 && this.props.pos.y === 384)  || 
              (this.props.pos.x === 128 && this.props.pos.y === 384) || 
              (this.props.pos.x === 192 && this.props.pos.y === 384)) ? "bfront" : "btop"

          }`} 

             style={{ left: this.props.pos.x,
                      top: this.props.pos.y }}>
        </div>

    );
  }
}

export default Block;
