import React, { Component } from 'react';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    const gameBoardArr = this.props.GameBoardArr;
    this.state = { gameBoardArr, generationCount: 0 };

    this.checkGameBoard = this.checkGameBoard.bind(this);
    this.startGameBoardInterval = this.startGameBoardInterval.bind(this);
    this.stopGameBoardInterval = this.stopGameBoardInterval.bind(this);
    this.clearGameBoard = this.clearGameBoard.bind(this);
  }

  componentDidMount() {
    this.startGameBoardInterval();
  }

  componentWillUnmount() {
    clearInterval(this.generationInterval);
  }

  generateGameBoard() {
    return (
      <tbody>
        {this.state.gameBoardArr.map(
          (currElement, rowIndex) => this.generateGameBoardRow(rowIndex))
        }
      </tbody>);
  }

  generateGameBoardRow(rowIndex) {
    return (
      <tr key={rowIndex}>
        {this.state.gameBoardArr[rowIndex].map(
          (currElement, colIndex) =>
            this.generateGameBoardCol(colIndex, rowIndex))
        }
      </tr>);
  }

  generateGameBoardCol(colIndex, rowIndex) {
    const key = `${rowIndex.toString()}:${colIndex.toString()}`;
    return (
      <td
        key={key}
        className={this.state.gameBoardArr[rowIndex][colIndex]}
        onClick={() => this.createNewCell(key)}
      />);
  }

  checkGameBoard() {
    const stateHolder = this.state;
    const tempGameBoardArr = stateHolder.gameBoardArr;
    const newGameBoardArr = [];

    // Assigns values for surrounding cells.
    function indexToCheck(arr, index, prior) {
      if (prior) {
        if (parseInt(index, 10) - 1 >= 0) {
          return parseInt(index, 10) - 1;
        }
        return arr.length - 1;
      }
      if (parseInt(index, 10) + 1 < arr.length) {
        return parseInt(index, 10) + 1;
      }
      return 0;
    }

    for (let i in tempGameBoardArr) {
      newGameBoardArr.push([]);
      for (let k in tempGameBoardArr[i]) {
        let neighbourCount = 0;
        const currentRow = parseInt(i, 10);
        const currentCol = parseInt(k, 10);
        const priorRow = indexToCheck(tempGameBoardArr, i, true);
        const laterRow = indexToCheck(tempGameBoardArr, i, false);
        const priorCol = indexToCheck(tempGameBoardArr[i], k, true);
        const laterCol = indexToCheck(tempGameBoardArr[i], k, false);

        // Check all cells surrounding current cell to get neighbour count.
        if (tempGameBoardArr[priorRow][priorCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[priorRow][currentCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[priorRow][laterCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[currentRow][priorCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[currentRow][laterCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[laterRow][priorCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[laterRow][currentCol] === 'old') {
          neighbourCount += 1;
        }
        if (tempGameBoardArr[laterRow][laterCol] === 'old') {
          neighbourCount += 1;
        }
        // Determine if cell lives, dies or reproduces.
        if (neighbourCount < 2 || neighbourCount > 3) {
          newGameBoardArr[i].push('empty');
        } else if (neighbourCount === 3) {
          newGameBoardArr[i].push('old');
        } else if (neighbourCount === 2 && tempGameBoardArr[currentRow][currentCol] === 'old') {
          newGameBoardArr[i].push('old');
        } else {
          newGameBoardArr[i].push('empty');
        }
      }
    }
    stateHolder.gameBoardArr = newGameBoardArr;
    stateHolder.generationCount += 1;
    this.setState(stateHolder);
  }

  createNewCell(key) {
    const keyArr = key.split(':');
    const stateHolder = this.state;
    stateHolder.gameBoardArr[keyArr[0]][keyArr[1]] = 'old';
    this.setState(stateHolder);
  }

  startGameBoardInterval() {
    this.generationInterval = setInterval(this.checkGameBoard, 200);
  }

  stopGameBoardInterval() {
    clearInterval(this.generationInterval);
  }

  clearGameBoard() {
    clearInterval(this.generationInterval);
    const stateHolder = this.state;
    stateHolder.generationCount = 0;
    stateHolder.gameBoardArr = this.props.GenerateGameBoardArr(false);
    this.setState(stateHolder);
  }

  render() {
    return (
      <div>
        <h2>Generation: {this.state.generationCount}</h2>
        <table>
          {this.generateGameBoard()}
        </table>
        <button onClick={this.startGameBoardInterval}>Start</button>
        <button onClick={this.stopGameBoardInterval}>Stop</button>
        <button onClick={this.clearGameBoard}>Clear</button>
      </div>
    );
  }
}

GameBoard.propTypes = {
  GameBoardArr: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired)
    .isRequired)
  .isRequired,
  GenerateGameBoardArr: React.PropTypes.func.isRequired,
};
