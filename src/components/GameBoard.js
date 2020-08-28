import React, { Component } from 'react'
import Square from './Squares'

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousBoard: Array(9).fill(null),
      board: Array(9).fill(null),
      xTurn: true,
    }
  }

  renderSquare(i) {
    return <Square value={this.state.board[i]} onClick={() => this.handleClick(i)} />
  }

  handleClick(i) {
    const board = this.state.board.slice();

    this.setState({
      previousBoard: this.state.board,
    });


    if (winner(board) || board[i]) {
      return;
    }
    
    board[i] = this.state.xTurn ? 'X' : 'O';
    this.setState({
      board: board,
      xTurn: !this.state.xTurn,
    });
  }

  handleRestart() {
    const board = this.state.board;
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
    this.setState({ 
      board: board,
      xTurn: true, 
    })
  }

  handleUndo() {
    console.log(this.state.previousBoard)

    this.setState({
      board: this.state.previousBoard,
      xTurn: !this.state.xTurn,
    });
  }

  render() {
    const win = winner(this.state.board);

    let turn;
    let gameStatus;
    if (win && win !== 'draw') {
      turn = "Player " + win + " Wins!"
      gameStatus = "Play Again!"
    } else if (win && win === 'draw') {
      turn = "It's a Draw!"
      gameStatus = "Play Again!"
    } else {
      turn = "Player " + (this.state.xTurn ? 'X' : 'O') + " Turn!"
      gameStatus = "Restart!"
    }

    return (
      <div className="board">
        <p className="turn">{turn}</p>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="button-row">
          <button className="game-status" onClick={() => this.handleUndo()}>Undo Move</button>
          <button className="game-status" onClick={() => this.handleRestart()}>{gameStatus}</button>
        </div>
      </div>
    )
  }
}


function winner(board) {
  const winCons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winCons.length; i++) {
    const [a, b, c] = winCons[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i] == null) {
      return null
    }
  }
  return 'draw';
}

export default GameBoard;