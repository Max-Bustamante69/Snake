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
    // Keyboard controls (desktop)
    document.addEventListener("keydown", (e) => {
      if (!this.state.running) {
        this.state.start();
        return;
      }
      if (e.key.startsWith("Arrow")) {
        const dir = e.key.replace("Arrow", "").toLowerCase();
        this.snake.setDirection(dir);
      }
    });

    // Start button
    document.getElementById("startBtn").addEventListener("click", () => {
      this.snake.reset();
      this.food.generate();
      this.state.start();
    });

    // --- Mobile swipe controls ---
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    });

    document.addEventListener("touchend", (e) => {
      if (!this.state.running) {
        this.state.start();
        return;
      }
      if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (dx > 20) this.snake.setDirection("right");
          else if (dx < -20) this.snake.setDirection("left");
        } else {
          // Vertical swipe
          if (dy > 20) this.snake.setDirection("down");
          else if (dy < -20) this.snake.setDirection("up");
        }
      }
    });
  }
}
