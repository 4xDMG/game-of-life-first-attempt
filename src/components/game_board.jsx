import React, { Component } from 'react';

export default class GameBoard extends Component {
  /* static generateGameBoardCol() {
    return <td>asfdg</td>;
  } */

  constructor(props) {
    super(props);

    this.state = { gameBoardArr: this.props.GameBoardArr };
  }

  // generateGameBoardArr used to sit here. Trying to pass it as props from App.

  generateGameBoard() {
    return <tbody>{this.generateGameBoardRow()}</tbody>;
  }

  generateGameBoardRow() {
    return <tr>{this.generateGameBoardCol()}</tr>;
  }

  generateGameBoardCol() {
    return <td>aaa</td>;
  }

  render() {
    return (
      <table>
        {this.generateGameBoard()}
      </table>
    );
  }
}
