import Game from "./game";
import { WIDTH, HEIGHT } from "./game-params";

const containerEl = document.getElementById("container");
if (containerEl) {
  containerEl.style.display = "grid";
  containerEl.style.justifyContent = "center";
}

const game = new Game(WIDTH, HEIGHT);
game.run();
