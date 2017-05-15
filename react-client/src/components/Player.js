/*
  
  Player component \
  ( sibling to blocks and boxes ) top layer

*/
import React from 'react';

class Player extends React.Component{

  constructor(props){
    super(props);

    // console.log("playerOne props",props)
  }




  render(){

    // console.log( "Rendering player: ",this.props );

    return( 

        <div className={`playerone move${this.props.pos.dir}${this.props.pos.frame} alive${this.props.pos.alive}`}
             style={{ left: this.props.pos.x,
                       top: this.props.pos.y }} >
        </div>

    );
  }
}

export default Player;
