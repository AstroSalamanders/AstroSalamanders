import React from 'react';

class Bomb extends React.Component{

  constructor(props){
    super(props);
    console.log('Bomb props', props)
  }

  render(){
    return( 

        <div className={`bomb bomb${this.props.pos.frame}`} 
             style={{ left: this.props.pos.x,
                      top: this.props.pos.y }}>
        </div>

    );
  }
}

export default Bomb;