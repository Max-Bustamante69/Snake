import CONSTANTS, { Directions, OppositeDirection } from "./constants.js";

export default class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    this.body = [{ x: 0, y: 0 }];
    this.direction = "right";
    this.nextDirection = "right";
    this.directionChanged = false;
  }

  setDirection(newDirection) {
    if (
      !this.directionChanged &&
      OppositeDirection[this.direction] !== newDirection
    ) {
      this.nextDirection = newDirection;
      this.directionChanged = true;
    }
  }

  move() {
    this.direction = this.nextDirection;
    const head = { ...this.body[0] };
    head.x += Directions[this.direction][0];
    head.y += Directions[this.direction][1];

    // Wrap around
    head.x = (head.x + CONSTANTS.gridSize) % CONSTANTS.gridSize;
    head.y = (head.y + CONSTANTS.gridSize) % CONSTANTS.gridSize;

    this.body.unshift(head);
    this.directionChanged = false;
    return head;
  }

  shrink() {
    this.body.pop();
  }

  isCollision(pos) {
    // Exclude the head itself
    return this.body.slice(1).some(({ x, y }) => x === pos.x && y === pos.y);
  }

  getHead() {
    return this.body[0];
  }

  getLength() {
    return this.body.length;
  }
}
