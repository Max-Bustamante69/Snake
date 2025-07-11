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
    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (!this.state.running) {
        this.state.start();
        return;
      }

      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const dir = e.key.replace("Arrow", "").toLowerCase();
        this.snake.setDirection(dir);
      }

      // Pause/Resume with Space or P
      if (e.key === " " || e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (this.state.running) {
          this.state.pause();
        } else {
          this.state.resume();
        }
      }
    });

    // Start button
    document.getElementById("startBtn").addEventListener("click", () => {
      this.snake.reset();
      this.food.generate();
      this.state.start();
    });

    // Mobile controls
    const directions = ["up", "down", "left", "right"];
    directions.forEach((dir) => {
      const btn = document.querySelector(`.control-button.${dir}`);
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          if (!this.state.running) {
            this.state.start();
            return;
          }
          this.snake.setDirection(dir);
        });
      }
    });

    // Add touch event listeners for better mobile experience
    this.addTouchListeners();
  }

  addTouchListeners() {
    // Prevent default touch behaviors that might interfere with the game
    document.addEventListener(
      "touchstart",
      (e) => {
        if (
          e.target.closest(".control-button") ||
          e.target.closest("#gameBoard")
        ) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // Add swipe gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener("touchend", (e) => {
      if (!this.state.running) return;

      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      this.handleSwipe();
    });

    // Handle swipe gestures
    this.handleSwipe = () => {
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      const minSwipeDistance = 30;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (Math.abs(diffX) > minSwipeDistance) {
          if (diffX > 0) {
            this.snake.setDirection("left");
          } else {
            this.snake.setDirection("right");
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(diffY) > minSwipeDistance) {
          if (diffY > 0) {
            this.snake.setDirection("up");
          } else {
            this.snake.setDirection("down");
          }
        }
      }
    };
  }
}
