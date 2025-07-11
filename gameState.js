import CONSTANTS from "./constants.js";

export default class GameState {
  constructor(snake, food, ui) {
    this.snake = snake;
    this.food = food;
    this.ui = ui;
    this.score = 0;
    this.running = false;
    this.interval = null;
    this.gameSpeed = 150; // Initial speed
  }

  start() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.running = true;
    this.score = 0;
    this.gameSpeed = 150;
    this.ui.toggleStartButton(false);
    this.ui.updateScore(this.score);
    this.ui.clearBoard();
    this.ui.hideGameOverlay();
    this.ui.hideDialog();
    this.loop();
    this.interval = setInterval(() => this.loop(), this.gameSpeed);
  }

  stop(win = false) {
    this.ui.toggleStartButton(true);
    this.running = false;
    clearInterval(this.interval);

    // Update high score
    this.ui.updateHighScore(this.score);

    if (win) {
      this.ui.showDialog(this.score);
    } else {
      this.ui.showGameOverlay(this.score);
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
      this.ui.showScoreAnimation();
      this.ui.showFoodCollected();

      // Increase speed slightly as score increases
      this.increaseSpeed();

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

  increaseSpeed() {
    // Increase speed every 5 points
    if (this.score % 5 === 0 && this.gameSpeed > 50) {
      this.gameSpeed -= 10;
      clearInterval(this.interval);
      this.interval = setInterval(() => this.loop(), this.gameSpeed);
    }
  }

  pause() {
    if (this.running) {
      this.running = false;
      clearInterval(this.interval);
    }
  }

  resume() {
    if (!this.running) {
      this.running = true;
      this.interval = setInterval(() => this.loop(), this.gameSpeed);
    }
  }
}
