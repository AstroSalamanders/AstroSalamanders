import React from 'react';

class Flame extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return( 

        <div className="flame" 
             style={{ left: this.props.pos.x,
                      top: this.props.pos.y }}>
        </div>

    );
  }
}

export default Flame;