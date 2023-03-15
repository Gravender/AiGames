export class Bitboard {
  maxBits: number;
  bitsBucket: number;
  length: number;
  board: number[];
  constructor(board: number[]) {
    this.maxBits = 4294967296; // (2 ^ 32)
    this.bitsBucket = 32;
    this.length = 64;
    this.board = board;
  }
  copy() {
    return new Bitboard(this.board.slice());
  }
  and(bb: Bitboard) {
    var targetBoard = this.copy();
    for (var i = 0; i < targetBoard.board.length; i++) {
      targetBoard.board[i] = (targetBoard.board[i] & bb.board[i]) >>> 0;
    }
    return targetBoard;
  }
  or(bb: Bitboard) {
    var targetBoard = this.copy();
    for (var i = 0; i < targetBoard.board.length; i++) {
      targetBoard.board[i] = (targetBoard.board[i] | bb.board[i]) >>> 0;
    }
    return targetBoard;
  }
  xor(bb: Bitboard) {
    var targetBoard = this.copy();
    for (var i = 0; i < targetBoard.board.length; i++) {
      targetBoard.board[i] = (targetBoard.board[i] ^ bb.board[i]) >>> 0;
    }
    return targetBoard;
  }
  shiftLeft(shiftAmount: number) {
    var targetBoard = this.copy();
    if (shiftAmount >= 0) {
      var bitMask =
        ((Math.pow(2, shiftAmount) - 1) << (this.bitsBucket - shiftAmount)) >>>
        0;
      var carryDigits =
        ((targetBoard.board[1] & bitMask) >>> 0) >>>
        (this.bitsBucket - shiftAmount);
      if (shiftAmount === this.bitsBucket) {
        targetBoard.board[1] = 0;
        targetBoard.board[0] = carryDigits;
      } else if (shiftAmount > this.bitsBucket && shiftAmount < this.length) {
        targetBoard.board[0] =
          (targetBoard.board[1] << (shiftAmount - this.bitsBucket)) >>> 0;
        targetBoard.board[1] = 0;
      } else if (shiftAmount >= this.length) {
        targetBoard.board[0] = 0;
        targetBoard.board[1] = 0;
      } else {
        targetBoard.board[1] = (targetBoard.board[1] << shiftAmount) >>> 0;
        targetBoard.board[0] =
          (((targetBoard.board[0] << shiftAmount) >>> 0) | carryDigits) >>> 0;
      }
    }
    return targetBoard;
  }
  shiftRight(shiftAmount: number) {
    var targetBoard = this.copy();
    if (shiftAmount >= 0) {
      var bitMask =
        ((Math.pow(2, shiftAmount) - 1) << (this.bitsBucket - shiftAmount)) >>>
        0;
      var carryDigits =
        (((targetBoard.board[0] << (this.bitsBucket - shiftAmount)) >>> 0) &
          bitMask) >>>
        0;
      if (shiftAmount === this.bitsBucket) {
        targetBoard.board[0] = 0;
        targetBoard.board[1] = carryDigits;
      } else if (shiftAmount > this.bitsBucket && shiftAmount < this.length) {
        targetBoard.board[1] =
          (targetBoard.board[0] >>> (shiftAmount - this.bitsBucket)) >>> 0;
        targetBoard.board[0] = 0;
      } else if (shiftAmount >= this.length) {
        targetBoard.board[0] = 0;
        targetBoard.board[1] = 0;
      } else {
        targetBoard.board[0] = (targetBoard.board[0] >>> shiftAmount) >>> 0;
        targetBoard.board[1] =
          ((targetBoard.board[1] >>> shiftAmount) | carryDigits) >>> 0;
      }
    }
    return targetBoard;
  }
  isEmpty() {
    return this.board[0] === 0 && this.board[1] === 0;
  }
}
