import React, { Component } from 'react';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    const gameBoardArr = this.props.GameBoardArr;
    this.state = { gameBoardArr };
    console.log(this.state.gameBoardArr[0]);
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
    const col = colIndex.toString();
    const row = rowIndex.toString();
    const key = `${row}:${col}`;
    return <td key={key}></td>;
  }

  render() {
    return (
      <table>
        {this.generateGameBoard()}
      </table>
    );
  }
}

GameBoard.propTypes = {
  GameBoardArr: React.PropTypes.arrayOf.isRequired,
};
