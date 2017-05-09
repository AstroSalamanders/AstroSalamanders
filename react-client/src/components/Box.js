/*
  
  Box component [ the walls that break ] 
  ( sibling to player, blocks ) top layer

*/
import React from 'react';

class Box extends React.Component{

  constructor(props){
    super(props);
    // console.log("Box props",props)
  }



  render(){
    return( 

        <div className="box"
             style={{ left: this.props.pos.x,
                      top: this.props.pos.y }} >
        </div>

    );
  }
}

export default Box;
