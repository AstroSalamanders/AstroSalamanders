import React from 'react';

class Controls extends React.Component {

  constructor(props){
    super(props);
    this.state = { pressing: null }
    this.move = this.move.bind(this);
  }

  move(dir){
    this.props.move(dir);
  }

  setPress(action){

    /*
        var flag = false;
        $thing.bind('touchstart click', function(){
          if (!flag) {
            flag = true;
            setTimeout(function(){ flag = false; }, 100);
            // do something
          }

          return false
        });
    */

  }

  render(){
    return (

      <div className="controls">

          <div className="btn-group btn-group-justified" role="group" aria-label="controls">

              <div className="btn-group" role="group">
                <button id="Left" type="button" className="btn" onClick={ () => this.move('left')}>
                  <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                </button>
              </div>

              <div className="btn-group" role="group">
                <button id="Up" type="button" className="btn" onClick={ () => this.move('up')}>
                  <span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                </button>
              </div>

              <div className="btn-group" role="group">
                <button id="Down" type="button" className="btn" onClick={ () => this.move('down')}>
                  <span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                </button>
              </div>

              <div className="btn-group" role="group">
                <button id="Right" type="button" className="btn" onClick={ () => this.move('right') }>
                  <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                </button>
              </div>

              <div className="btn-group" role="group">
                <button id="Bomb" type="button" className="btn" onClick={ () => this.move('spacebar') }>
                  <span className="glyphicon glyphicon-record" aria-hidden="true"></span>
                </button>
              </div>

          </div>

      </div>

    )
  }

}

export default Controls;