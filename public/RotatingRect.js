export default class RotatingRect {
  constructor(game) {
    this.x = 500;
    this.y = 500;

    this.w = 50;
    this.h = 100;

    this.angle = 0;

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
  }
  draw(ctx) {

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(this.angle);
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();


    ctx.fillStyle = "rgb(0,0,0)";
    ctx.beginPath();
    ctx.arc(this.x + this.w / 2, this.y + this.h / 2, 5, 0, Math.PI * 2, false);
    ctx.fill();
  }
}