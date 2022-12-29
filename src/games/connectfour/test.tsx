class ConnectFour {
  board: number;
  turn: number;
  moves: number;
  possibleMoves: number;

  constructor() {
    this.board = 0;
    this.turn = 1;
    this.moves = 0;
    this.possibleMoves = 0;
  }

  /**
   * makeMove - To make a move on the board
   *
   * @param  {number} column - The column to make a move in
   * @return {boolean}  - Returns true if move was successful
   */
  makeMove(column: number): boolean {
    // If column is out of bounds, return false
    if (column < 0 || column > 7) {
      return false;
    }

    // If column is full, return false
    if (this.board & (1 << column)) {
      return false;
    }

    // Make move
    this.board |= 1 << column;
    this.turn *= -1;
    this.moves++;
    this.possibleMoves = 0;

    return true;
  }

  /**
   * undoMove - To undo the previous move
   *
   * @return {boolean}  - Returns true if undo was successful
   */
  undoMove(): boolean {
    // If no moves have been made, return false
    if (this.moves === 0) {
      return false;
    }

    // Undo move
    this.board ^= 1 << (this.moves - 1);
    this.turn *= -1;
    this.moves--;
    this.possibleMoves = 0;

    return true;
  }

  /**
   * isGameOver - To check if the game is over
   *
   * @return {boolean}  - Returns true if game is over
   */
  isGameOver(): boolean {
    // Check for win
    if (this.checkWin() !== 0) {
      return true;
    }

    // Check for draw
    if (this.moves === 42) {
      return true;
    }

    return false;
  }

  /**
   * getScore - To get the score of the game
   *
   * @return {number}  - Returns the score of the game
   */
  getScore(): number {
    return this.checkWin();
  }

  /**
   * resetGame - To reset the board
   *
   * @return {void}
   */
  resetGame(): void {
    this.board = 0;
    this.turn = 1;
    this.moves = 0;
    this.possibleMoves = 0;
  }

  // Private functions

  /**
   * checkWin - To check if there is a winner
   *
   * @return {number}  - Returns 1 or -1 if there is a winner, 0 if there is no winner
   */
  private checkWin(): number {
    // Check horizontal
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        let bitmask = 0;
        for (let k = 0; k < 4; k++) {
          bitmask |= 1 << (i * 7 + j + k);
        }

        if ((this.board & bitmask) === bitmask) {
          return 1;
        } else if ((this.board & bitmask) === (bitmask ^ 0xffffffff)) {
          return -1;
        }
      }
    }

    // Check vertical
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        let bitmask = 0;
        for (let k = 0; k < 4; k++) {
          bitmask |= 1 << (i + j * 7 + k * 7);
        }

        if ((this.board & bitmask) === bitmask) {
          return 1;
        } else if ((this.board & bitmask) === (bitmask ^ 0xffffffff)) {
          return -1;
        }
      }
    }

    // Check diagonal
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        let bitmask = 0;
        for (let k = 0; k < 4; k++) {
          bitmask |= 1 << (i * 7 + j + k * 8);
        }

        if ((this.board & bitmask) === bitmask) {
          return 1;
        } else if ((this.board & bitmask) === (bitmask ^ 0xffffffff)) {
          return -1;
        }
      }
    }

    // Check diagonal
    for (let i = 0; i < 3; i++) {
      for (let j = 6; j > 2; j--) {
        let bitmask = 0;
        for (let k = 0; k < 4; k++) {
          bitmask |= 1 << (i * 7 + j - k * 6);
        }

        if ((this.board & bitmask) === bitmask) {
          return 1;
        } else if ((this.board & bitmask) === (bitmask ^ 0xffffffff)) {
          return -1;
        }
      }
    }

    return 0;
  }
}
export {};
