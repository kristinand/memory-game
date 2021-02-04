import React, { Component, Fragment } from 'react';
import Game from './containers/Game/Game';
import Header from './containers/Header/Header';
import { generateRandomColor } from './utils/functions';

class App extends Component {
  state = {
    level: 6,
  };

  onChangeLevelHandler(param) {
    let level = this.state.level;
    if (param === 'inc' && level < 6) {
      level += 1;
    } else if (param === 'dec' && level > 1) {
      level -= 1;
    }
    this.setState({ level: level });
  }

  render() {
    const color = generateRandomColor(40, 40, 60, 60);
    return (
      <Fragment>
        <Header
          buttonColor={color}
          changeLevel={(param) => this.onChangeLevelHandler(param)}
          level={this.state.level}
        />
        <Game coverColor={color} level={this.state.level} />
      </Fragment>
    );
  }
}

export default App;
