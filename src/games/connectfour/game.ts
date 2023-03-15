import { Bitboard } from "../bitboard";
export class ConnectFour {
  private bitboards: Bitboard[];
  private height: number[];
  private counter: number = 0;
  private moves: number[] = [];
  private moveOrder: number[] = [3, 2, 4, 1, 5, 6, 0];
  public possibleMoves: number[] = [3, 2, 4, 1, 5, 6, 0];
  private readonly top = new Bitboard([66052, 135274560]);
  private readonly mask = new Bitboard([0, 1]);

  constructor() {
    // create empty board
    this.height = [0, 7, 14, 21, 28, 35, 42];
    this.bitboards = [new Bitboard([0, 0]), new Bitboard([0, 0])];
  }
  canPlay(column: number): boolean {
    const mask = this.mask.shiftLeft(this.height[column]);
    return this.top.and(mask).isEmpty();
  }
  // makeMove: given a column, place a piece in that columns
  makeMove(column: number): void {
    let move = this.mask.shiftLeft(this.height[column]++);
    this.bitboards[this.counter & 1] =
      this.bitboards[this.counter & 1].xor(move);
    this.moves[this.counter++] = column;
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
    for (let col = 0; col <= 6; col++) {
      const mask = this.mask.shiftLeft(this.height[col]);
      if (this.top.and(mask).isEmpty()) {
        moves.push(col);
      }
    }
    return this.moveOrder.filter((move) => moves.includes(move));
  }
  public getBoard(player: number) {
    return `${this.bitboards[player].board[0]}${this.bitboards[player].board[1]}`;
  }
  public getBoardPrint() {
    const board: string[][] = Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => "")
    );
    const rows = [5, 5, 5, 5, 5, 5, 5];
    for (let i = 0; i < this.counter; i++) {
      const move = this.moves[i];
      board[rows[move]][move] = i & 1 ? "Yellow" : "Red";
      if (rows[move] !== 0) {
        rows[move]--;
      }
    }
    return board;
  }
  public getTurn() {
    return this.counter & 1;
  }
  isWin(bitboard: Bitboard): boolean {
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
    // Check rows
    let score = 0;
    if (this.isWin(this.bitboards[0])) {
      return Infinity;
    }
    if (this.isWin(this.bitboards[1])) {
      return -Infinity;
    }

    // Heuristic evaluation
    const lines = [
      // Horizontal lines    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
      // Vertical lines
      [0, 7, 14, 21],
      [7, 14, 21, 28],
      [14, 21, 28, 35],
      [21, 28, 35, 42],
      // Diagonal lines
      [0, 8, 16, 24],
      [1, 9, 17, 25],
      [2, 10, 18, 26],
      [3, 11, 19, 27],
      [7, 15, 23, 31],
      [8, 16, 24, 32],
      [9, 17, 25, 33],
      [10, 18, 26, 34],
      [14, 22, 30, 38],
      [15, 23, 31, 39],
      [16, 24, 32, 40],
      [17, 25, 33, 41],
      [3, 12, 21, 30],
      [4, 13, 22, 31],
      [5, 14, 23, 32],
      [6, 15, 24, 33],
      [10, 19, 28, 37],
      [11, 20, 29, 38],
      [12, 21, 30, 39],
      [13, 22, 31, 40],
    ];

    const playerOneLines = lines.filter((line) => {
      const lineBits = new Bitboard([0, 0]);
      line.forEach((square) => lineBits.or(this.mask.shiftLeft(square)));
      return !lineBits.and(this.bitboards[0]).isEmpty();
    }).length;

    const playerTwoLines = lines.filter((line) => {
      const lineBits = new Bitboard([0, 0]);
      line.forEach((square) => lineBits.or(this.mask.shiftLeft(square)));
      return !lineBits.and(this.bitboards[1]).isEmpty();
    }).length;

    score = playerOneLines - playerTwoLines;
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
