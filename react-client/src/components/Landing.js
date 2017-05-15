/* Landing Page */

import React from 'react';
import Board from './Board.js';

class Landing extends React.Component {

  constructor(props){
    super(props);
    this.disconnecter = this.disconnecter.bind(this);

    console.log("LANDING PROPS", this.props)
  }

  componentDidMount(){

    if ( this.props.socket ){

      console.log("THE PLAYER IS", this.props.player )
      
      if ( this.props.room ){

        console.log("FUCKIN ROOM", this.props.room)
        this.props.socket.emit('hard_disconnect', );
        console.log("DISCONNECTED ",this.props.page);
      }

    }

  }

  disconnecter(){
    

    if ( this.props.socket ){

      console.log("THE PLAYER IS", this.props.player )
      
      if ( this.props.room ){

        console.log("FUCKIN ROOM", this.props.room)
        this.props.socket.emit('hard_disconnect', );
        console.log("DISCONNECTED ",this.props.page);
      }

    }
  }

  render(){
    return( 
      <div id="Landing" className="container text-center">
        <div className="row">

        { /* this.disconnecter() */}

          <h1>BOMBER GAMES</h1>

          <button onClick={this.props.joinGameOnClick} className="btn btn-lg btn-default"> Play </button>
        </div>
      </div>
    );
  }
}

export default Landing;