import React, { Component } from 'react';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    const gameBoardArr = this.props.GameBoardArr;
    this.state = { gameBoardArr, generationCount: 0 };

    this.checkGameBoard = this.checkGameBoard.bind(this);
    this.startGameBoardInterval = this.startGameBoardInterval.bind(this);
    this.stopGameBoardInterval = this.stopGameBoardInterval.bind(this);
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
    return <td key={key} className={this.state.gameBoardArr[rowIndex][colIndex]} />;
  }

  checkGameBoard() {
    console.log('checking');
    const stateHolder = this.state;
    const tempGameBoardArr = this.state.gameBoardArr;
    for (var i in tempGameBoardArr) {
      for (var k in tempGameBoardArr[i]) {
        if (tempGameBoardArr[i][k] === 'old') {
          tempGameBoardArr[i][k] = 'empty';
        }
      }
    }
    stateHolder.gameBoardArr = tempGameBoardArr;
    stateHolder.generationCount += 1;
    this.setState(stateHolder);
  }

  startGameBoardInterval() {
    this.generationInterval = setInterval(this.checkGameBoard, 1000);
  }

  stopGameBoardInterval() {
    clearInterval(this.generationInterval);
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
};
