/*
  
  Player component \
  ( sibling to blocks and boxes ) top layer

*/
import React from 'react';

class Player extends React.Component{

  constructor(props){
    super(props);
  }




  render(){

    console.log( "Rendering player: ",this.props );

    return( 

        <div className="player"
             style={{ left: this.props.pos.x,
                       top: this.props.pos.y }} >
        </div>

    );
  }
}

export default Player;
