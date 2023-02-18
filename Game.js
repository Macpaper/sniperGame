import CircleGuy from "./CircleGuy.js";

export default class Game {
  constructor(WIDTH, HEIGHT) {
    this.gameWidth = WIDTH;
    this.gameHeight = HEIGHT;

    this.circles = [];

    for (let i = 0; i < 100; i++) {
      let randX = Math.random() * WIDTH;
      let randY = Math.random() * HEIGHT;
      let circle1 = new CircleGuy(this, randX, randY);
      this.circles.push(circle1);
    }
  }
  update() {
    this.circles.forEach((c) => {
      c.update();
    });
  }
  draw(ctx) {
    this.circles.forEach((c) => {
      c.draw(ctx);
    });
  }
}
