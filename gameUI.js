export default class GameUI {
  constructor() {
    this.board = document.getElementById("gameBoard");
    this.scoreEl = document.getElementById("score");
    this.highScoreEl = document.getElementById("highScore");
    this.startBtn = document.getElementById("startBtn");
    this.gameOverlay = document.getElementById("gameOverlay");
    this.finalScoreEl = document.getElementById("finalScore");
    this.restartBtn = document.getElementById("restartBtn");
    this.dialog = document.getElementById("gameDialog");
    this.dialogScoreEl = document.getElementById("dialogScore");
    this.dialogBtn = document.getElementById("dialogBtn");

    this.loadHighScore();
    this.setupEventListeners();
  }

  loadHighScore() {
    const highScore = localStorage.getItem("raccoonSnakeHighScore") || 0;
    this.highScoreEl.textContent = highScore;
    this.currentHighScore = parseInt(highScore);
  }

  updateHighScore(score) {
    if (score > this.currentHighScore) {
      this.currentHighScore = score;
      localStorage.setItem("raccoonSnakeHighScore", score.toString());
      this.highScoreEl.textContent = score;

      // Add celebration animation
      this.highScoreEl.style.animation = "none";
      this.highScoreEl.offsetHeight; // Trigger reflow
      this.highScoreEl.style.animation = "bounce 0.6s ease-in-out";
    }
  }

  setupEventListeners() {
    // Restart button in overlay
    if (this.restartBtn) {
      this.restartBtn.addEventListener("click", () => {
        this.hideGameOverlay();
        window.location.reload();
      });
    }

    // Dialog restart button
    if (this.dialogBtn) {
      this.dialogBtn.addEventListener("click", () => {
        this.hideDialog();
        window.location.reload();
      });
    }
  }

  showGameOverlay(score) {
    this.finalScoreEl.textContent = score;
    this.gameOverlay.classList.add("show");
  }

  hideGameOverlay() {
    this.gameOverlay.classList.remove("show");
  }

  showDialog(score) {
    this.dialogScoreEl.textContent = score;
    this.dialog.classList.remove("hidden");
  }

  hideDialog() {
    this.dialog.classList.add("hidden");
  }

  updateScore(score) {
    this.scoreEl.textContent = score;

    // Add score update animation
    this.scoreEl.style.animation = "none";
    this.scoreEl.offsetHeight; // Trigger reflow
    this.scoreEl.style.animation = "bounce 0.3s ease-in-out";
  }

  clearBoard() {
    this.board.innerHTML = "";
  }

  drawSnake(snake) {
    snake.body.forEach((segment, i) => {
      let className = "racc";
      if (i === 0) className = "racc-head";
      else if (i % 2) className = "racc";
      else className = "racc-light";
      this.drawCell(segment, className);
    });
  }

  drawFood(food) {
    this.drawCell(food.position, "food");
  }

  drawCell(pos, className) {
    const el = document.createElement("div");
    el.className = className;
    el.style.gridRow = pos.x + 1;
    el.style.gridColumn = pos.y + 1;
    this.board.appendChild(el);
  }

  toggleStartButton(show = true) {
    if (show) {
      this.startBtn.style.display = "flex";
    } else {
      this.startBtn.style.display = "none";
    }
  }

  // Add visual feedback for game events
  showScoreAnimation() {
    const scoreContainer = this.scoreEl.closest(".score-display");
    scoreContainer.style.animation = "none";
    scoreContainer.offsetHeight; // Trigger reflow
    scoreContainer.style.animation = "pulse 0.5s ease-in-out";
  }

  showFoodCollected() {
    // Add a brief flash effect to the game board
    this.board.style.animation = "none";
    this.board.offsetHeight; // Trigger reflow
    this.board.style.animation = "pulse 0.3s ease-in-out";
  }
}
