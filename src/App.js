import React, { Component, Fragment } from 'react';
import Game from './containers/Game/Game';

class App extends Component {
  state = {
    level: 6,
  };

  render() {
    return (
      <Fragment>
        <Game level={this.state.level}/>
      </Fragment>
    );
  }
}

export default App;
