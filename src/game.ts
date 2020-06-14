import Konva from "konva";
import { Stage } from "konva/types/Stage";
import { Layer } from "konva/types/Layer";
import { Text } from "konva/types/shapes/Text";

import Player from "./player";
import Fruit from "./fruit";
import { Rect } from "konva/types/shapes/Rect";
import { INITIAL_SPEED, DELTA, TEXT_COLOR, BACKGROUND_COLOR } from "./game-params";
import KeysListener from "./keys-listener";

class Game {
  private stage: Stage;
  private layer: Layer;
  private title: Text;
  private startMsg: Text;
  private shadowLayer: Rect;

  private gameStart: boolean = false;
  private speed: number;
  private control: { x: number; y: number };

  private player: Player;
  private fruit: Fruit;

  private mapWidth: number;
  private mapHeight: number;

  constructor(mapWidth: number, mapHeight: number) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    this.stage = new Konva.Stage({
      container: "container",
      width: this.mapWidth,
      height: this.mapHeight,
    });

    this.layer = new Konva.Layer();

    const backGround = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: BACKGROUND_COLOR,
    });

    this.shadowLayer = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: BACKGROUND_COLOR,
      opacity: 0.7,
    });

    this.title = new Konva.Text({
      x: this.stage.width() / 2 - 60,
      y: this.stage.width() / 2 - 40,
      text: "Snake",
      fontSize: 30,
      fontFamily: "Orbitron",
      fill: TEXT_COLOR,
    });

    this.startMsg = new Konva.Text({
      x: this.stage.width() / 2 - 135,
      y: this.stage.width() / 2,
      text: "Press 's' to start",
      fontSize: 30,
      fontFamily: "Orbitron",
      align: "center",
      verticalAlign: "middle",
      fill: TEXT_COLOR,
    });

    this.layer.add(backGround);
    this.gameOver();
    this.stage.add(this.layer);
    this.startKeyListener();
  }

  private startKeyListener() {
    const keyListener = new KeysListener({
      onStart: this.onStart.bind(this),
      onDown: this.onDown.bind(this),
      onLeft: this.onLeft.bind(this),
      onRight: this.onRight.bind(this),
      onUp: this.onUp.bind(this),
    });
    keyListener.listen();
  }

  private onStart() {
    if (!this.gameStart) {
      this.gameStart = true;

      if (this.player) {
        this.player.destroy();
      }

      if (this.fruit) {
        this.fruit.destroy();
      }

      this.player = new Player({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
      });

      this.layer.add(this.player.head);

      this.fruit = new Fruit({
        x: this.stage.width(),
        y: this.stage.height(),
      });

      this.layer.add(this.fruit.node);

      this.startMsg.remove();
      this.title.remove();
      this.shadowLayer.remove();
      this.speed = INITIAL_SPEED;
      this.control = { x: DELTA, y: 0 };
    }
  }

  private onLeft() {
    if (this.control.x !== DELTA) {
      this.control = { x: -DELTA, y: 0 };
    }
  }

  private onUp() {
    if (this.control.y !== DELTA) {
      this.control = { x: 0, y: -DELTA };
    }
  }

  private onRight() {
    if (this.control.x !== -DELTA) {
      this.control = { x: DELTA, y: 0 };
    }
  }

  private onDown() {
    if (this.control.y !== -DELTA) {
      this.control = { x: 0, y: DELTA };
    }
  }

  private gameOver() {
    if (this.player) {
      this.player.die();
    }
    this.gameStart = false;
    this.layer.add(this.shadowLayer);
    this.layer.add(this.startMsg);
    this.layer.add(this.title);
  }

  private gotFruit() {
    if (this.player.x === this.fruit.x && this.player.y === this.fruit.y) {
      return true;
    }
    return false;
  }

  private eatFruit() {
    this.fruit.replace();
    this.player.grow();
    this.layer.add(this.player.tail);
    this.speed++;
  }

  public run() {
    let lastRender = 0;
    const anim = new Konva.Animation((frame) => {
      if (frame) {
        const elapsedTime = frame.time - lastRender;
        if (elapsedTime / 1000 > 1 / this.speed) {
          lastRender = frame.time;

          if (this.gameStart) {
            this.player.move(this.control, this.mapWidth, this.mapHeight);

            if (this.gotFruit()) {
              this.eatFruit();
            }

            if (this.player.isOverSelf() && this.player.live) {
              this.gameOver();
            }
          }
        }
      }
    }, this.layer);

    anim.start();
  }
}

export default Game;
