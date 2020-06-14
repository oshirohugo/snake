import { Rect } from "konva/types/shapes/Rect";
import Konva from "konva";
import { Layer } from "konva/types/Layer";

type Pos = {
  x: number;
  y: number;
};

class Player {
  body: Rect[] = [];
  layer: Layer;
  static width: number = 20;
  static height: number = 20;
  fill: string;
  control: Pos;
  lastPos: Pos;
  live: boolean = true;

  constructor(layer: Layer, start: Pos) {
    this.fill = "#e91e63";
    const head = Player.createNewPiece(start, this.fill);
    this.body.push(head);
    this.layer = layer;
    this.layer.add(head);
  }

  public get x() {
    return this.body[0].x();
  }

  public get y() {
    return this.body[0].y();
  }

  private get head() {
    return this.body[0];
  }

  private get tail() {
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
    this.body.push(Player.createNewPiece(pos, this.fill));
    this.layer.add(this.tail);
  }

  private static createNewPiece(pos: Pos, fill: string) {
    const { x, y } = pos;
    return new Konva.Rect({
      x,
      y,
      width: Player.width,
      height: Player.height,
      fill,
      stroke: "black",
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

    this.head.x(Player.moveUnderLimit(this.head.x() + control.x, xLimit - 20));
    this.head.y(Player.moveUnderLimit(this.head.y() + control.y, yLimit - 20));
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
