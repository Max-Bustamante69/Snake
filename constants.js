const CONSTANTS = {
  gridSize: 20,
  winLength: 100, // You can adjust this for your win condition
};

export const Directions = Object.freeze({
  up: [-1, 0],
  left: [0, -1],
  down: [1, 0],
  right: [0, 1],
});

export const OppositeDirection = Object.freeze({
  up: "down",
  down: "up",
  right: "left",
  left: "right",
});

export default CONSTANTS;
