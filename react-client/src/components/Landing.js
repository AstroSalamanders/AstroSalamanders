/* Landing Page */

import React from 'react';
import Board from './Board.js';

class Landing extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return( 
      <div id="Landing" className="container text-center">
        <div className="row">
          <h1>BOMBER GAMES</h1>
          <button onClick={this.props.joinGameOnClick} className="btn btn-lg btn-default"> Play </button>
        </div>
      </div>
    );
  }
}

export default Landing;