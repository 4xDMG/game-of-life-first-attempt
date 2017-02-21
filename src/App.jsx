import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/game_board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { gameBoardSize: { cols: 100, rows: 50 } };
  }

  generateGameBoardArr(cols, rows) {
    const gameBoardArrTemp = [];
    for (let i = 0; i < rows; i += 1) {
      gameBoardArrTemp.push([]);
      for (let j = 0; j < cols; j += 1) {
        gameBoardArrTemp[i].push(' ');
      }
    }
    console.log('working');
    return gameBoardArrTemp;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Conway&#39;s Game of Life</h2>
        </div>
        <div>
          <GameBoard
            GameBoardArr={() => this.generateGameBoardArr(this.state.gameBoardSize.cols, this.state.gameBoardSize.rows)}
          />
        </div>
      </div>
    );
  }
}

export default App;
