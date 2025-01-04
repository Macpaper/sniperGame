export default class Projectile {
  constructor(game, x = 500, y = 500, dx = 0, dy = 0, angle = 0, id = 1) {
    this.game = game;
    this.w = 200;
    this.h = 20;
    this.x = x - this.w/2;
    this.y = y - this.h/2;

    this.angle = angle;

    this.dx = dx;
    this.dy = dy;
    this.ax = 0;
    this.ay = 0;

    this.damage = 0;

    this.id = id;
    this.rotateLeft = false;
    this.rotateRight = false;
  }
  update() {

    if (this.rotateLeft) {
      this.angle -= Math.PI / 180;
    }
    if (this.rotateRight) {
      this.angle += Math.PI / 180;
    }


    this.x += this.dx;
    this.y += this.dy;
  }
  draw(ctx) {
    // ctx.fillStyle = "rgb(255, 255, 255)";
    // ctx.fillText("i think my x is: " + (this.x + this.w), this.game.gameWidth - 500, 100 + this.id * 20);
    ctx.fillStyle = "rgb(0, 0, 0)";
    
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(this.angle);
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}