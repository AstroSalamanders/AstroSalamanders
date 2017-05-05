import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Game from './components/Game.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {};
  }

  render() {
    return (
    <div>
      <Game />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));