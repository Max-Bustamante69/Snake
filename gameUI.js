export default class GameUI {
  constructor() {
    this.board = document.getElementById("gameBoard");
    this.scoreEl = document.getElementById("score");
    this.dialog = this.createDialog();
    document.body.appendChild(this.dialog);
  }

  createDialog() {
    const dialog = document.createElement("div");
    dialog.className = "game-dialog";
    dialog.style.display = "none";
    dialog.innerHTML = `
      <div class="dialog-content">
        <h2 id="dialogTitle"></h2>
        <p id="dialogMessage"></p>
        <img id="dialogImage" src"">
        <button id="dialogBtn">Restart</button>
      </div>
    `;
    dialog.querySelector("#dialogBtn").onclick = () => {
      dialog.style.display = "none";
      window.location.reload(); // Simple reload for restart
    };
    return dialog;
  }

  showDialog(title, message, imageSrc) {
    this.dialog.querySelector("#dialogTitle").innerText = title;
    this.dialog.querySelector("#dialogMessage").innerText = message;
    this.dialog.querySelector("#dialogImage").src = imageSrc
    this.dialog.style.display = "flex";
  }

  updateScore(score) {
    this.scoreEl.innerText = score;
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
      this.drawCell(segment, className,);
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
}
