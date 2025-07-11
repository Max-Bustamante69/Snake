import CONSTANTS from "./constants.js";

export default class GameState {
  constructor(snake, food, ui) {
    this.snake = snake;
    this.food = food;
    this.ui = ui;
    this.score = 0;
    this.running = false;
    this.interval = null;
  }

  start() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.running = true;
    this.score = 0;
    this.ui.updateScore(this.score);
    this.ui.clearBoard();
    this.loop();
    this.interval = setInterval(() => this.loop(), 100);
  }

  stop(win = false) {
    this.running = false;
    clearInterval(this.interval);
    if (win) {
      this.ui.showDialog(
        "You Win!",
        "Congratulations! 🦝",
        "https://i.pinimg.com/736x/76/c9/70/76c970fe6f3fd3839bb06e96eaff654a.jpg"
      );
    } else {
      this.ui.showDialog(
        "Game Over",
        "You lost! 🦝",
        "https://live.staticflickr.com/7029/6823976429_3f465d44d5_b.jpg"
      );
    }
  }

  loop() {
    if (!this.running) return;
    this.ui.clearBoard();

    // Move snake
    const newHead = this.snake.move();

    // Check collision
    if (this.snake.isCollision(newHead)) {
      this.stop(false);
      return;
    }

    // Check food
    if (
      newHead.x === this.food.position.x &&
      newHead.y === this.food.position.y
    ) {
      this.score++;
      this.ui.updateScore(this.score);
      if (this.snake.getLength() >= CONSTANTS.winLength) {
        this.stop(true);
        return;
      }
      this.food.generate();
      // Don't remove tail (grow)
    } else {
      this.snake.shrink();
    }

    // Draw everything
    this.ui.drawFood(this.food);
    this.ui.drawSnake(this.snake);
  }
}
