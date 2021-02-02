import React, { Component, Fragment } from 'react';
import Game from './containers/Game/Game';
import Header from './containers/Header/Header';

class App extends Component {
  state = {
    level: 6,
  };

  onChangeLevelHandler(param) {
    let level = this.state.level;
    if (param === 'inc' && level < 6) {
      level +=1;
    } else if (param === 'dec' && level > 1) {
      level -=1;
    }
    this.setState({level: level});
  }

  render() {
    return (
      <Fragment>
        <Header changeLevel={(param) => this.onChangeLevelHandler(param)} level={this.state.level} />
        <Game level={this.state.level} />
      </Fragment>
    );
  }
}

export default App;
