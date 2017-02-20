import React, { Component } from 'react';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = { gameBoardSize: { cols: 100, rows: 50 }, gameBoardArr: [] };

    this.generateGameBoardArr(this.state.gameBoardSize.cols, this.state.gameBoardSize.rows);
  }

  generateGameBoardArr(cols, rows) {
    let gameBoardArrTemp = [];
    for (var i = 0; i < rows; i += 1) {
      gameBoardArrTemp.push([]);
      for (var j = 0; j < cols; j += 1) {
        gameBoardArrTemp[i].push(' ');
      }
    }
    this.setState(state..., gameBoardArr: gameBoardArrTemp);
  }

  render() {
    return <p>hi</p>;
  }
}
