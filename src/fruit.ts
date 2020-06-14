import { Rect } from "konva/types/shapes/Rect";
import Konva from "konva";
import { Layer } from "konva/types/Layer";

type Pos = {
  x: number;
  y: number;
};

class Fruit {
  node: Rect;
  static width: number = 20;
  static height: number = 20;
  fill: string;
  limits: Pos;

  constructor(layer: Layer, limits: Pos) {
    this.limits = limits;
    this.node = new Konva.Rect({
      x: Fruit.generateRandomInt(limits.x - 20),
      y: Fruit.generateRandomInt(limits.y - 20),
      width: Fruit.width,
      height: Fruit.height,
      fill: "#66bb6a",
      stroke: "black",
      strokeWidth: 4,
    });
    layer.add(this.node);
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

  private static generateRandomInt(max: number, gridSize: number = 20) {
    const limit = max / gridSize;
    return Math.floor(Math.random() * Math.floor(limit)) * gridSize;
  }

  public destroy() {
    this.node.remove();
  }

  public draw() {}
}

export default Fruit;
