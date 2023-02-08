import React from "react";
import { ConnectFour } from "./game";
import minmaxAlphaBeta from "../minmax";
import "./style.css";
interface Props {}

interface State {
  board: string[][];
  turn: number;
  moves: number[];
}
// ConnectFourGame is a component which renders a Connect Four game.
// It contains a ConnectFour object to represent the game state.
// It also contains necessary methods to play the game and reset it.
class ConnectFourGame extends React.Component<Props, State> {
  ConnectFour: ConnectFour;
  // Creates a ConnectFour object and sets its state.
  constructor(props: Props) {
    super(props);
    this.ConnectFour = new ConnectFour();
    this.state = {
      board: this.ConnectFour.getBoardPrint(),
      turn: this.ConnectFour.getTurn(),
      moves: this.ConnectFour.possibleMoves,
    };
  }
  // Checks if the game is over, returns true if game is over.
  isGameOver = () => {
    if (this.ConnectFour.isGameOver()) {
      console.log(this.ConnectFour.info());
    }
    return this.ConnectFour.isGameOver();
  };
  // Gets the score of the game, returns a string.
  getScore = () => {
    const score = this.ConnectFour.getScore();
    if (score > 0) {
      return "Red Won!";
    } else if (score < 0) {
      return "Yellow Won!";
    } else {
      return "You tied";
    }
  };
  // Makes a move based on the given column, updates the state.
  makeMove = (col: number) => {
    if (
      !this.isGameOver() &&
      this.ConnectFour.canPlay(col) &&
      this.state.turn === 0
    ) {
      this.ConnectFour.makeMove(col);
      if (!this.isGameOver()) {
        const bestMove = minmaxAlphaBeta(this.ConnectFour, "Min", 8);
        this.ConnectFour.makeMove(bestMove);
      }
      this.setState({
        board: this.ConnectFour.getBoardPrint(),
        turn: this.ConnectFour.getTurn(),
        moves: this.ConnectFour.possibleMoves,
      });
    }
  };
  // Resets the game state.
  resetGame = () => {
    this.ConnectFour.resetGame();
    this.setState({
      board: this.ConnectFour.getBoardPrint(),
      turn: this.ConnectFour.getTurn(),
      moves: this.ConnectFour.possibleMoves,
    });
  };

  // Returns a div containing all possible moves.
  getPossibleMoves = () => {
    return (
      <div>
        {this.state.moves.map((move) => (
          <div key={`pos${move}`}>{move}</div>
        ))}
      </div>
    );
  };

  // Renders the game board, game over message and reset button.
  render() {
    return (
      <div>
        <div className="gameBoardConnectFour">
          {this.state.board.map((row, i) =>
            row.map((col, j) => (
              <div
                key={`${i}-${j}`}
                className="gridItemConnectFour"
                onClick={() => this.makeMove(j)}
              >
                {col === "" ? (
                  <div className="pieceConnectFour"></div>
                ) : col === "Red" ? (
                  <div
                    style={{ backgroundColor: "#ff6961" }}
                    className="pieceConnectFour"
                  ></div>
                ) : (
                  <div
                    style={{ backgroundColor: "#f5f591" }}
                    className="pieceConnectFour"
                  ></div>
                )}
              </div>
            ))
          )}
        </div>
        <div>
          {this.isGameOver() && (
            <div className="gameOverConnectFour">
              <h1>Game Over!</h1>
              <h2>{this.getScore()}</h2>
              <button type="button" onClick={this.resetGame}>
                Reset Game
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ConnectFourGame;
