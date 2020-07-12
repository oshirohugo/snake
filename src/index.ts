import Game from "./game";
import { WIDTH, HEIGHT } from "./game-params";

function startSnake() {
  const containerEl = document.getElementById("container");
  if (containerEl) {
    containerEl.style.display = "grid";
    containerEl.style.justifyContent = "center";
    containerEl.style.border;
  }
  const game = new Game(WIDTH, HEIGHT);
  game.run();
}

const snakeItem = document.getElementById("snake");
if (snakeItem) {
  snakeItem.addEventListener("click", () => {
    const gameSelector = document.getElementById("game-selector");
    if (gameSelector) {
      gameSelector.style.display = "none";
    }
    document.body.style.backgroundColor = "white";
    startSnake();
  });
}
