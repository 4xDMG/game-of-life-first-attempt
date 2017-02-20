import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/game_board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Conway&#39;s Game of Life</h2>
        </div>
        <div>
          <GameBoard />
        </div>
      </div>
    );
  }
}

export default App;
