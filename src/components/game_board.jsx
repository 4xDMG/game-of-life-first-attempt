import React, { Component } from 'react';

export default class GameBoard extends Component {
  static generateGameBoardCol() {
    return <td>asfdg</td>;
  }

  constructor(props) {
    super(props);

    this.state = { gameBoardArr: this.props.GameBoardArr };
  }

  // generateGameBoardArr used to sit here. Trying to pass it as props from App.

  generateGameBoard() {
    console.log('gengb');
    this.state.gameBoardArr.map(function () {
      return (
        <tbody>{this.generateGameBoardRow()}</tbody>
      );
    });
  }

  generateGameBoardRow() {
    return <tr> {() => this.generateGameBoardCol()} </tr>;
  }

  render() {
    return (
      <table>
        {this.generateGameBoard()}
      </table>
    );
  }
}
