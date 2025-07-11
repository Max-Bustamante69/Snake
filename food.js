import CONSTANTS from "./constants.js";

export default class Food {
  constructor(snake) {
    this.snake = snake;
    this.position = this.generate();
  }

  generate() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * CONSTANTS.gridSize),
        y: Math.floor(Math.random() * CONSTANTS.gridSize),
      };
    } while (this.snake.body.some(({ x, y }) => x === pos.x && y === pos.y));
    this.position = pos;
    return pos;
  }
}
