export default class CircleGuy {
  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.r = 15;
    this.game = game;
    this.xSpeed = Math.random() * 3;
    this.ySpeed = Math.random() * 3;
    this.xSpeed =0;
    this.ySpeed = 0;
    
    this.dx = 0;
    this.dy = 0;
    if (Math.floor(Math.random() * 2) == 0) {
      this.dx = this.xSpeed;
    } else {
      this.dx = -this.xSpeed;
    }
    if (Math.floor(Math.random() * 2) == 0) {
      this.dy = this.ySpeed;
    } else {
      this.dy = -this.ySpeed;
    }
    this.ax = 0;
    this.ay = 0;
    this.color = "blue";
  }
  update() {
    this.color = "blue";
    this.game.projectiles.forEach(p => {
      let theta = -p.angle;

      let originX = p.x + p.w / 2;
      let originY = p.y + p.h / 2;
      let cx = this.x;
      let cy = this.y;

      let xp = Math.cos(theta) * (cx - originX) - Math.sin(theta) * (cy - originY) + originX;
      let yp = Math.sin(theta) * (cx - originX) + Math.cos(theta) * (cy - originY) + originY;

      let closestX, closestY;
      if (xp < p.x) {
        closestX = p.x;
      } else if (xp > p.x + p.w) {
        closestX = p.x + p.w;
      } else {
        closestX = xp;
      }

      if (yp < p.y) {
        closestY = p.y;
      } else if (yp > p.y + p.h) {
        closestY = p.y + p.h;
      } else {
        closestY = yp;
      }

      let diffX = closestX - xp;
      let diffY = closestY - yp;
      let dist = Math.sqrt(diffX * diffX + diffY * diffY);
      if (dist < this.r) {
        this.color = "red";
        this.collidedWith(p);
      }
    });

    this.dx += this.ax;
    this.dy += this.ay;
    this.x += this.dx;
    this.y += this.dy;

    this.dx = this.dx * 0.88;
    this.dy = this.dy * 0.88;

    if (Math.abs(this.dx) < this.xSpeed) {
      if(this.dx < 0) {
        this.dx = -this.xSpeed;
      } else {
        this.dx = this.xSpeed;
      }
    }
    if (Math.abs(this.dy) < this.ySpeed) {
      if(this.dy < 0) {
        this.dy = -this.ySpeed;
      } else {
        this.dy = this.ySpeed;
      }
    }

    this.ax = this.ax * 0.88;
    this.ay = this.ay * 0.88;

    if (Math.abs(this.ax) < 0.01) {
      this.ax = 0;
    }
    if (Math.abs(this.ay) < 0.01) {
      this.ay = 0;
    }

    if (this.x < this.r) {
      this.x = this.r;
      this.dx = -this.dx;
      this.ax = -this.ax;
      
    }
    if (this.x > this.game.gameWidth - this.r) {
      this.x = this.game.gameWidth - this.r;
      this.dx = -this.dx;
      this.ax = -this.ax;
    }
    if (this.y < this.r) {
      this.y = this.r
      this.dy = -this.dy;
      this.ay = -this.ay;
    }
    if(this.y > this.game.gameHeight - this.r) {
      this.y = this.game.gameHeight - this.r;
      this.dy = -this.dy;
      this.ay = -this.ay;
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
  collidedWith(p) {
    console.log("COLLIDING!!!");
    let dmg = p.damage;
    this.ax = p.dx / 10;
    this.ay = p.dy / 10;
  }
}
