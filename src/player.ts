import { Rect } from "konva/types/shapes/Rect";
import Konva from "konva";

import { PLAYER_SIZE, GRID_SIZE, PLAYER_COLOR, BACKGROUND_COLOR } from "./game-params";
import { Pos } from "./types";

class Player {
  body: Rect[] = [];
  control: Pos;
  lastPos: Pos;
  live: boolean = true;

  constructor(start: Pos) {
    const head = Player.createNewPiece(start);
    this.body.push(head);
  }

  public get x() {
    return this.body[0].x();
  }

  public get y() {
    return this.body[0].y();
  }

  public get head() {
    return this.body[0];
  }

  public get tail() {
    return this.body[this.body.length - 1];
  }

  public isOverSelf() {
    for (let i = 1; i < this.body.length; i++) {
      if (
        this.head.x() === this.body[i].x() &&
        this.head.y() === this.body[i].y()
      ) {
        return true;
      }
    }

    return false;
  }

  public grow() {
    const pos: Pos = {
      x: this.lastPos.x,
      y: this.lastPos.y,
    };
    this.body.push(Player.createNewPiece(pos));
  }

  private static createNewPiece(pos: Pos, fill: string = PLAYER_COLOR) {
    const { x, y } = pos;
    return new Konva.Rect({
      x,
      y,
      width: PLAYER_SIZE,
      height: PLAYER_SIZE,
      fill,
      stroke: BACKGROUND_COLOR,
      strokeWidth: 4,
    });
  }

  public move(control: Pos, xLimit: number, yLimit: number) {
    this.control = control;
    let previousPos: Pos = { x: this.head.x(), y: this.head.y() };
    let currentPos: Pos;
    for (let i = 1; i < this.body.length; i++) {
      currentPos = { x: this.body[i].x(), y: this.body[i].y() };

      this.body[i].x(previousPos.x);
      this.body[i].y(previousPos.y);

      previousPos = currentPos;
    }
    this.lastPos = previousPos;

    this.head.x(
      Player.moveUnderLimit(this.head.x() + control.x, xLimit - GRID_SIZE)
    );
    this.head.y(
      Player.moveUnderLimit(this.head.y() + control.y, yLimit - GRID_SIZE)
    );
  }

  private static moveUnderLimit(newPos: number, limit: number) {
    if (newPos > limit) {
      return 0;
    }
    if (newPos < 0) {
      return limit;
    }
    return newPos;
  }

  public die() {
    this.live = false;
  }

  public destroy() {
    this.body.forEach((node) => node.remove());
  }
}

export default Player;
