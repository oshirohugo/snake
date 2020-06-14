import { Rect } from "konva/types/shapes/Rect";
import Konva from "konva";

import { GRID_SIZE, FRUIT_SIZE, FRUIT_COLOR, BACKGROUND_COLOR } from "./game-params";
import { Pos } from "./types";

class Fruit {
  node: Rect;
  static width: number = 20;
  static height: number = 20;
  fill: string;
  limits: Pos;

  constructor(limits: Pos) {
    this.limits = limits;
    this.node = new Konva.Rect({
      x: Fruit.generateRandomInt(limits.x - GRID_SIZE),
      y: Fruit.generateRandomInt(limits.y - GRID_SIZE),
      width: FRUIT_SIZE,
      height: FRUIT_SIZE,
      fill: FRUIT_COLOR,
      stroke: BACKGROUND_COLOR,
      strokeWidth: 4,
    });
  }

  public get x() {
    return this.node.x();
  }

  public get y() {
    return this.node.y();
  }

  public replace() {
    this.node.x(Fruit.generateRandomInt(this.limits.x));
    this.node.y(Fruit.generateRandomInt(this.limits.y));
  }

  private static generateRandomInt(max: number, gridSize: number = GRID_SIZE) {
    const limit = max / gridSize;
    return Math.floor(Math.random() * Math.floor(limit)) * gridSize;
  }

  public destroy() {
    this.node.remove();
  }

  public draw() {}
}

export default Fruit;
