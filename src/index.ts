import Konva from "konva";
import Player from "./player";
import Fruit from "./fruit";

const GRID_SIZE = 20;
const INITIAL_SPEED = 5;
let gameStart: boolean = false;

const containerEl = document.getElementById("container");
if (containerEl) {
  containerEl.style.display = "grid";
  containerEl.style.justifyContent = "center";
}

const width = GRID_SIZE * 20;
const height = GRID_SIZE * 20;

const stage = new Konva.Stage({
  container: "container",
  width,
  height,
});

const layer = new Konva.Layer();

const backGround = new Konva.Rect({
  x: 0,
  y: 0,
  width,
  height,
  fill: "black",
});

const blackLayer = new Konva.Rect({
  x: 0,
  y: 0,
  width,
  height,
  fill: "black",
  opacity: 0.7,
});

const title = new Konva.Text({
  x: stage.width() / 2 - 60,
  y: stage.width() / 2 - 40,
  text: "Snake",
  fontSize: 30,
  fontFamily: "Orbitron",
  fill: "white",
});

const startText = new Konva.Text({
  x: stage.width() / 2 - 135,
  y: stage.width() / 2,
  text: "Press 's' to start",
  fontSize: 30,
  fontFamily: "Orbitron",
  align: "center",
  verticalAlign: "middle",
  fill: "white",
});

const DELTA = GRID_SIZE;
let control = { x: DELTA, y: 0 };

layer.add(backGround);
layer.add(title);
layer.add(startText);

let player: Player;
let fruit: Fruit;
let speed: number; // how many times it moves per second;

document.addEventListener("keydown", (e) => {
  if (!gameStart) {
    if (e.keyCode === 83) {
      if (player) {
        player.destroy();
      }

      if (fruit) {
        fruit.destroy();
      }

      player = new Player(layer, {
        x: stage.width() / 2 + 20,
        y: stage.height() / 2 + 20,
      });
      fruit = new Fruit(layer, { x: stage.width(), y: stage.height() });
      gameStart = true;
      startText.remove();
      title.remove();
      blackLayer.remove();
      speed = INITIAL_SPEED;
    }
  }

  if (e.keyCode === 37 && control.x !== DELTA) {
    control = { x: -DELTA, y: 0 };
  } else if (e.keyCode === 38 && control.y !== DELTA) {
    control = { x: 0, y: -DELTA };
  } else if (e.keyCode === 39 && control.x !== -DELTA) {
    control = { x: DELTA, y: 0 };
  } else if (e.keyCode === 40 && control.y !== -DELTA) {
    control = { x: 0, y: DELTA };
  } else {
    return;
  }
  e.preventDefault();
});

stage.add(layer);

function gotFruit(player: Player, fruit: Fruit) {
  if (player.x === fruit.x && player.y === fruit.y) {
    return true;
  }
  return false;
}

function eatFruit(player: Player, fruit: Fruit) {
  fruit.replace();
  player.grow();
  speed++;
}

let lastRender = 0;
const anim = new Konva.Animation((frame) => {
  if (frame) {
    const elapsedTime = frame.time - lastRender;
    if (elapsedTime / 1000 > 1 / speed) {
      lastRender = frame.time;

      if (gameStart && player.live) {
        player.move(control, width, height);

        if (gotFruit(player, fruit)) {
          eatFruit(player, fruit);
        }

        if (player.isOverSelf() && player.live) {
          player.die();
          gameStart = false;
          layer.add(blackLayer);
          layer.add(startText);
          layer.add(title);
        }
      }
    }
  }
}, layer);

anim.start();
