export type Spot = {};
export class Piece {
  private killed = false;
  public white = "";
  public value = 0;
  public constructor(white: string, value: number) {
    this.white = white;
    this.value = value;
  }
  public isKilled() {
    return this.killed;
  }
  public setKilled() {
    this.killed = true;
  }
}
export class King extends Piece {
  private castlingPossible = true;
  public constructor(white: string) {
    super(white, 500);
  }
  public isCastlingPossible() {
    return this.isCastlingPossible;
  }
  public setCastlingPossible() {
    this.castlingPossible = false;
  }
}
export class Rook extends Piece {
  public constructor(white: string) {
    super(white, 5);
  }
  public canMove(
    start: { team: string; x: number; y: number },
    end: { team: string; x: number; y: number },
    board: [[Pawn | Rook | Bishop | Knight | Queen | King | Piece]]
  ) {
    if (start.team === end.team) {
      return false;
    }
    let x = Math.abs(start.x - end.x);
    let y = Math.abs(start.y - end.y);
    if ((x > 0 && y === 0) || (y > 0 && x === 0)) {
      if (x > 0) {
        for (let i = 1; i <= x; i += 1) {
          if (board[start.x + i][start.y].white !== "") {
            return false;
          }
        }
      } else {
        for (let i = 1; i <= y; i += 1) {
          if (board[start.x][start.y + i].white !== "") {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}
export class Bishop extends Piece {
  public constructor(white: string) {
    super(white, 3);
  }
  public canMove(
    start: { team: string; x: number; y: number },
    end: { team: string; x: number; y: number },
    board: [[Pawn | Rook | Bishop | Knight | Queen | King | Piece]]
  ) {
    if (start.team === end.team) {
      return false;
    }
    let x = Math.abs(start.x - end.x);
    let y = Math.abs(start.y - end.y);
    if (x === y) {
      for (let i = 1; i <= y; i += 1) {
        if (board[start.x + i][start.y + i].white !== "") {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
export class Knight extends Piece {
  public constructor(white: string) {
    super(white, 3);
  }
  public canMove(
    start: { team: string; x: number; y: number },
    end: { team: string; x: number; y: number },
    board: [[Pawn | Rook | Bishop | Knight | Queen | King | Piece]]
  ) {
    if (start.team === end.team) {
      return false;
    }
    let x = Math.abs(start.x - end.x);
    let y = Math.abs(start.y - end.y);
    return x * y === 2;
  }
}
export class Pawn extends Piece {
  private firstMove = true;
  public constructor(white: string) {
    super(white, 1);
  }
  public setfirstMove() {
    this.firstMove = false;
  }
  public canMove(
    start: { team: string; x: number; y: number },
    end: { team: string; x: number; y: number },
    board: [[Pawn | Rook | Bishop | Knight | Queen | King | Piece]],
    lastMoveTwoSquare: boolean
  ) {
    if (start.team === end.team) {
      return false;
    }
    let x = Math.abs(start.x - end.x);
    let y = Math.abs(start.y - end.y);
    if (x === 0) {
      if (this.firstMove) {
        return (
          (y === 2 || y === 1) &&
          x === 0 &&
          board[start.x][start.y + 1].white === "" &&
          end.team === ""
        );
      } else {
        return y === 1 && x === 0 && end.team === "";
      }
    } else {
      return (
        (y === 1 && x === 1 && end.team !== "") ||
        (y === 1 && x === 1 && end.team === "" && lastMoveTwoSquare)
      );
    }
  }
}
export class Queen extends Piece {
  public constructor(white: string) {
    super(white, 3);
  }
  public canMove(
    start: { team: string; x: number; y: number },
    end: { team: string; x: number; y: number },
    board: [[Piece]]
  ) {
    if (start.team === end.team) {
      return false;
    }
    let x = Math.abs(start.x - end.x);
    let y = Math.abs(start.y - end.y);
    if ((x > 0 && y === 0) || (y > 0 && x === 0)) {
      if (x > 0) {
        for (let i = 1; i <= x; i += 1) {
          if (board[start.x + i][start.y].white !== "") {
            return false;
          }
        }
      } else {
        for (let i = 1; i <= y; i += 1) {
          if (board[start.x][start.y + i].white !== "") {
            return false;
          }
        }
      }
      return true;
    } else if (x === y) {
      for (let i = 1; i <= y; i += 1) {
        if (board[start.x + i][start.y + i].white !== "") {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
