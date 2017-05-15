/*
  
  Player component \
  ( sibling to blocks and boxes ) top layer

*/
import React from 'react';

class PlayerTwo extends React.Component{

  constructor(props){
    super(props);
  }




  render(){

    // console.log( "Rendering player: ",this.props );

    return( 

        <div className={`playertwo move${this.props.pos.dir}${this.props.pos.frame}  alive${this.props.pos.alive}`}
             style={{ left: this.props.pos.x,
                       top: this.props.pos.y }} >
        </div>

    );
  }
}

export default PlayerTwo;
