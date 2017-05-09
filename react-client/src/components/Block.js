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

        <div className="block" 
             style={{ left: this.props.pos.x,
                      top: this.props.pos.y }}>
        </div>

    );
  }
}

export default Block;
