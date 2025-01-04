import Zombie from "./Zombie.js";
import Player from "./Player.js";
import RotatingRect from "./RotatingRect.js";

export default class Game {
  constructor(WIDTH, HEIGHT) {
    this.gameWidth = WIDTH;
    this.gameHeight = HEIGHT;

    this.player = new Player(this);

    this.circles = [];
    this.projectiles = [];
    this.circles.push(new Zombie(this, 500,500));

    for(let i = 0; i < 20; i++) {
      let enemy = new Zombie(this, Math.random() * this.gameWidth, Math.random() * this.gameHeight);
      this.circles.push(enemy);
    }

  }
  update() {
    this.projectiles.forEach((p) => {
      p.update();
    });
    this.circles.forEach((c) => {
      c.update();
    });
    this.player.update();
  }
  draw(ctx) {
    this.projectiles.forEach((p) => {
      p.draw(ctx);
    });
    this.circles.forEach((c) => {
      c.draw(ctx);
    });
    this.player.draw(ctx);
  }
}
