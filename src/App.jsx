import React, { Component } from 'react';
import './App.css';
import GameBoard from './components/game_board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { gameBoardSize: { cols: 50, rows: 30 }, initialGameCellStates: ['old', 'empty', 'empty'] };
  }

  componentWillMount() {
    this.generateGameBoardArr(true);
  }

  generateGameBoardArr(
    random,
    cols = this.state.gameBoardSize.cols,
    rows = this.state.gameBoardSize.rows) {
    const gameBoardArrTemp = [];
    for (let i = 0; i < rows; i += 1) {
      gameBoardArrTemp.push([]);
      for (let j = 0; j < cols; j += 1) {
        if (random) {
          gameBoardArrTemp[i].push(this.state.initialGameCellStates[Math.floor(Math.random() * 3)]);
        } else {
          gameBoardArrTemp[i].push('empty');
        }
      }
    }

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
            GameBoardArr={this.generateGameBoardArr(true)}
            GenerateGameBoardArr={() => this.generateGameBoardArr()}
          />
        </div>
      </div>
    );
  }
}

export default App;
