import Snake from "./snake.js";
import Food from "./food.js";
import GameUI from "./gameUI.js";
import GameState from "./gameState.js";

export default class GameManager {
  constructor() {
    this.snake = new Snake();
    this.food = new Food(this.snake);
    this.ui = new GameUI();
    this.state = new GameState(this.snake, this.food, this.ui);

    this.addEventListeners();
    this.ui.drawFood(this.food);
    this.ui.drawSnake(this.snake);
  }

    addEventListeners() {
        document.addEventListener("keydown", (e) => {
        if (!this.state.running) {
            this.state.start();
            return
        };
        if (e.key.startsWith("Arrow")) {
            const dir = e.key.replace("Arrow", "").toLowerCase();
            this.snake.setDirection(dir);
        }
        });

    document.getElementById("startBtn").addEventListener("click", () => {
      this.snake.reset();
      this.food.generate();
      this.state.start();
    });


    ["up", "down", "left", "right"].forEach((dir) => {
      const btn = document.querySelector(`.arrow.${dir}`);
      if (btn) {
        btn.addEventListener("click", () => {
          if (!this.state.running) {
            this.state.start();
            return;
          }
          this.snake.setDirection(dir);
        });
      }
    });
  }
}
