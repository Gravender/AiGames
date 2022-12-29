import { Bitboard } from "../bitboard";
export class ConnectFour {
  private bitboards: Bitboard[];
  private height: number[];
  private counter: number;
  private moves: number[];
  private moveOrder: number[];
  public possibleMoves: number[];

  constructor() {
    // create empty board
    this.height = [0, 7, 14, 21, 28, 35, 42];
    this.bitboards = [new Bitboard([0, 0]), new Bitboard([0, 0])];
    this.counter = 0;
    this.moves = [];
    this.possibleMoves = [3, 2, 4, 1, 5, 6, 0];
    this.moveOrder = [3, 2, 4, 1, 5, 6, 0];
  }
  canPlay(column: number): boolean {
    let TOP = new Bitboard([66052, 135274560]);
    let mask = new Bitboard([0, 1]).shiftLeft(this.height[column]);
    return TOP.and(mask).isEmpty();
  }
  // makeMove: given a column, place a piece in that columns
  makeMove(column: number): void {
    let move = new Bitboard([0, 1]).shiftLeft(this.height[column]++); // (1)
    this.bitboards[this.counter & 1] =
      this.bitboards[this.counter & 1].xor(move); // (2)
    this.moves[this.counter++] = column; // (3)
    this.possibleMoves = this.getPossibleMoves();
    /* console.log(
      `column: ${column} height: ${
        this.height
      } move: ${move} \n\nbitboard X: ${this.dec2bin(
        this.bitboards[0].toNumber()
      )} \nbitboard Y: ${this.dec2bin(
        this.bitboards[1].toNumber()
      )}\n\n moves: ${this.moves}`
    ); */
  }
  getPossibleMoves() {
    const moves: number[] = [];
    let TOP = new Bitboard([66052, 135274560]);
    let mask = new Bitboard([0, 1]);
    for (let col = 0; col <= 6; col++) {
      mask = new Bitboard([0, 1]).shiftLeft(this.height[col]);
      if (TOP.and(mask).isEmpty()) moves.push(col);
    }
    let moves2 = this.moveOrder.filter((move) => moves.includes(move));
    return moves2;
  }
  public getBoard(player: number) {
    let out =
      this.bitboards[player].board[0].toString() +
      this.bitboards[player].board[1].toString();
    return out;
  }
  public getBoardPrint() {
    let board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    let rows = [5, 5, 5, 5, 5, 5, 5];
    for (let i = 0; i < this.counter; i++) {
      let move = this.moves[i];
      if (i & 1) {
        board[rows[move]][move] = "Yellow";
      } else {
        board[rows[move]][move] = "Red";
      }
      if (rows[move] !== 0) {
        rows[move]--;
      }
    }
    return board;
  }
  public getTurn() {
    return this.counter & 1;
  }
  isWin(bitboard: Bitboard) {
    const directions: Array<number> = [1, 7, 6, 8];
    for (const direction of directions) {
      var firstShift = bitboard.shiftRight(2 * direction);
      var secondShift = bitboard.shiftRight(3 * direction);
      var result = bitboard
        .and(bitboard.shiftRight(direction))
        .and(firstShift)
        .and(secondShift);
      if (!result.isEmpty()) return true;
    }
    return false;
  }
  // isGameOver: check if the game is over by checking for a winner
  isGameOver(): boolean {
    let result =
      this.isWin(this.bitboards[0]) ||
      this.isWin(this.bitboards[1]) ||
      this.counter === 42;
    return result;
  }
  info() {
    console.log(
      `\n\nbitboard X: ${
        this.bitboards[0].board
      }\n bitboard Xnum: ${this.bitboards[0].board.toString()} \nbitboard Y: ${
        this.bitboards[1].board
      }\n bitboard Ynum: ${this.bitboards[1].board.toString()}\n\n`
    );
  }
  dec2bin(dec: number) {
    return (dec >>> 0)
      .toString(2)
      .split("")
      .reverse()
      .join("")
      .replace(/(.{7})/g, "$1 ")
      .split("")
      .reverse()
      .join("");
  }
  // getScore
  getScore(): number {
    //Check rows
    let score = 0;
    if (this.isWin(this.bitboards[0]))
      return 22 - Math.floor(1 - this.counter / 2);
    if (this.isWin(this.bitboards[1]))
      return -(21 - Math.floor(1 - this.counter / 2));
    return score;
  }

  // undoMove: remove the last move
  undoMove(column: number): void {
    const col = this.moves[--this.counter]; // reverses (3)
    let move = new Bitboard([0, 1]).shiftLeft(--this.height[col]); // reverses (1)
    this.bitboards[this.counter & 1] =
      this.bitboards[this.counter & 1].xor(move); // reverses (2)
    this.possibleMoves = this.getPossibleMoves();
  }
  resetGame(): void {
    this.height = [0, 7, 14, 21, 28, 35, 42];
    this.bitboards = [new Bitboard([0, 0]), new Bitboard([0, 0])];
    this.counter = 0;
    this.moves = [];
    this.possibleMoves = [3, 2, 4, 1, 5, 6, 0];
  }
}
