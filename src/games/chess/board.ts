export class Piece {
  protected x: number;
  protected y: number;
  protected color: "white" | "black";

  constructor(x: number, y: number, color: "white" | "black") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  canMoveTo(x: number, y: number): boolean {
    // To be implemented by each piece subclass
    return false;
  }
}
class Queen extends Piece {
  canMoveTo(x: number, y: number): boolean {
    return (
      this.x === x ||
      this.y === y ||
      Math.abs(this.x - x) === Math.abs(this.y - y)
    );
  }
}
class Bishop extends Piece {
  canMoveTo(x: number, y: number): boolean {
    return Math.abs(this.x - x) === Math.abs(this.y - y);
  }
}
class Rook extends Piece {
  canMoveTo(x: number, y: number): boolean {
    return this.x === x || this.y === y;
  }
}
class Knight extends Piece {
  canMoveTo(x: number, y: number): boolean {
    return (
      (Math.abs(this.x - x) === 2 && Math.abs(this.y - y) === 1) ||
      (Math.abs(this.x - x) === 1 && Math.abs(this.y - y) === 2)
    );
  }
}
class Pawn extends Piece {
  private firstMove: boolean = true;
  private direction: number;

  constructor(x: number, y: number, color: "white" | "black") {
    super(x, y, color);
    this.direction = color === "white" ? -1 : 1;
  }

  canMoveTo(x: number, y: number, capturing: boolean = false): boolean {
    if (capturing) {
      return (
        (this.x === x + 1 || this.x === x - 1) && this.y + this.direction === y
      );
    }
    if (this.firstMove) {
      this.firstMove = false;
      return this.x === x && this.y + 2 * this.direction === y;
    }
    return this.x === x && this.y + this.direction === y;
  }
}
class King extends Piece {
  private hasMoved: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(x: number, y: number, color: "white" | "black") {
    super(x, y, color);
  }

  canMoveTo(x: number, y: number): boolean {
    if (
      Math.abs(this.x - x) <= 1 &&
      Math.abs(this.y - y) <= 1 &&
      !(this.x === x && this.y === y)
    ) {
      this.hasMoved = true;
      return true;
    }
    return false;
  }

  canCastle(rookX: number, rookY: number): boolean {
    if (!this.hasMoved && !(this.x - rookX)) {
      // check if the squares between the king and rook are empty
      const steps = this.y > rookY ? -1 : 1;
      for (let i = this.y + steps; i !== rookY; i += steps) {
        // code to check if square is empty
      }
      this.hasMoved = true;
      return true;
    }
    return false;
  }
}
