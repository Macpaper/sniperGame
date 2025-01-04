import Input from "./Input.js";
import Projectile from "./projectile.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.x = this.game.gameWidth / 2;
    this.y = this.game.gameHeight / 2;
    
    this.dx = 0;
    this.dy = 0;
    // acceleration
    this.ax = 0;
    this.ay = 0;
    
    this.r = 25;
    
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;

    this.color = "blue";

    this.shooting = false;
    this.sniping = false;
    this.shootingTimer = Date.now();
    this.shootingDelay = 200;

    this.mouseX = this.x;
    this.mouseY = this.y;
    this.poop = 1;
    this.weapons = {
      lmg: {
        damage: 5,
        shootingDelay: 50,
        speed: 20,
        type: "lmg"
      },
      shotgun: {
        damage: 10,
        shootingDelay: 500,
        speed: 30,
        type: "shotgun"
      },
      sniper: {
        damage: 1,
        shootingDelay: 1000,
        speed: 60,
        type: "sniper"
      },  
      rocket: {
        damage: 25,
        shootingDelay: 1500,
        speed: 10,
        type: "rocket"
      }
    };
    this.currentWeapon = this.weapons.sniper;
    this.angleArc = Math.PI / 4;

    this.input = new Input(this.game, this);
    this.count = 0;
    this.countDelay = this.weapons.sniper.shootingDelay / 17;
  }
  update() {

    this.shootingDelay = this.currentWeapon.shootingDelay;

    if (this.shooting) {
      if (this.currentWeapon.type == "sniper") {
        this.sniping = true;

        this.count += 1;
        this.angleArc = this.angleArc - Math.PI / (this.countDelay * 4);
        if (this.count > this.countDelay) {
          this.count = 0;
          this.angleArc = Math.PI / 4;
          let diffY = this.y - this.mouseY;
          let diffX = this.x - this.mouseX;

          let angle = Math.atan2(diffY, diffX) + Math.PI;
          
          let dx = Math.cos(angle) * this.currentWeapon.speed;
          let dy = Math.sin(angle) * this.currentWeapon.speed;
          let p = new Projectile(this.game, this.x + dx * 1.2, this.y + dy * 1.2, dx, dy, angle);
          // let p = new Projectile(this.game, this.x + 2 * dx, this.y + 2 * dy, 0, angle);
          p.damage = 60;
          this.game.projectiles.push(p);
        }
      } else {
        if (Date.now() - this.shootingTimer > this.shootingDelay) {

          this.shootingTimer = Date.now();

        }
      }
      

    } else {
      if (this.currentWeapon.type == "sniper") {
        if(this.sniping) {
          if (this.poop == 1) {
            // let p = new Projectile(this.game);
            // this.game.projectiles.push(p);
            this.poop += 1;
          } else {
            this.sniping = false;
            let diffY = this.y - this.mouseY;
            let diffX = this.x - this.mouseX;
  
            // let angle = Math.atan2(diffY, diffX) + Math.PI;
            let startAngle = Math.atan2(diffY, diffX) + Math.PI - this.angleArc/2;
            let endAngle = startAngle + this.angleArc;
            let angle = Math.random() * (endAngle - startAngle) + startAngle;
            // let angle = startAngle + this.angleArc/2;
            
            let dx = Math.cos(angle) * this.currentWeapon.speed;
            let dy = Math.sin(angle) * this.currentWeapon.speed;
            let p = new Projectile(this.game, this.x + dx * 1.2, this.y + dy * 1.2, dx, dy, angle); 
            // let p = new Projectile(this.game, this.x, this.y, 0, 0, angle);
            p.id = this.game.projectiles.length + 1;

            p.damage = this.count;
            p.h = this.count / 3;
            this.count = 0;
            this.angleArc = Math.PI / 4;
            this.game.projectiles.push(p);
          }
        }
      }
    }

    if (this.up) {
      this.dy -= 5;
    }
    if (this.left) {
      this.dx -= 5;
    }
    if (this.down) {
      this.dy += 5;
    }
    if (this.right) {
      this.dx += 5;
    }

    this.dx += this.ax;
    this.dy += this.ay;
    this.x += this.dx;
    this.y += this.dy;
    
    this.dx = 0;
    this.dy = 0;
    this.ax = 0;
    this.ay = 0;
  }
  draw(ctx) {

    if (this.currentWeapon.type == "sniper") {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

      let diffY = this.y - this.mouseY;
      let diffX = this.x - this.mouseX;


      let angle = Math.atan2(diffY, diffX) + Math.PI - this.angleArc/2;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);

      
      ctx.arc(this.x, this.y, 1000, angle, angle + this.angleArc);
      ctx.fill();
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.fillColor = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 300, 0, Math.PI * 2, false);
    ctx.stroke();
    // DEBUGGING CODE
    // ctx.fillStyle = "white";
    // ctx.font =  "20px serif";
    // ctx.fillText("x: " + this.mouseX, this.mouseX, this.mouseY);
    // ctx.fillText("y: " + this.mouseY, this.mouseX, this.mouseY + 17);

    // ctx.fillText("player x: " + this.x, 50, 20);
    // ctx.fillText("player y: " + this.y, 50, 40);
    // ctx.fillText("# projectiles: " + this.game.projectiles.length, 50, 60);

    // let yOffset = 0;
    // let pCount = 1;
    
    
    // this.game.projectiles.forEach(p => {
    //   ctx.fillText("projectile #: " + pCount, 50, 100 + yOffset);
    //   yOffset += 20;
    //   ctx.fillText("angle: " + p.angle + " rads", 50, 100 + yOffset);
    //   yOffset += 20;
    //   ctx.fillText("ox: " + " " + (p.x + p.w/2), 50, 100 + yOffset);
    //   yOffset += 20;
    //   ctx.fillText("oy: " + " " + (p.y + p.h/2), 50, 100 + yOffset);
    //   yOffset += 20;
    //   pCount += 1;
    // });
  }
}



    // {
    //   let p = this.game.rotatingRect;
    //   let dx = this.x - p.x + p.w / 2;
    //   let dy = this.y - p.y + p.h / 2;
    //   let theta = -p.angle;
    //   // let theta = Math.PI/4;
    //   // center x of rectangle
    //   let originX = p.x + p.w / 2;
    //   let originY = p.y + p.h / 2;
    //   let cx = this.x;
    //   let cy = this.y;

    //   let xp = Math.cos(theta) * (cx - originX) - Math.sin(theta) * (cy - originY) + originX;
    //   let yp = Math.sin(theta) * (cx - originX) + Math.cos(theta) * (cy - originY) + originY;

    //   let closestX, closestY;
    //   if (xp < p.x) {
    //     closestX = p.x;
    //   } else if (xp > p.x + p.w) {
    //     closestX = p.x + p.w;
    //   } else {
    //     closestX = xp;
    //   }

    //   if (yp < p.y) {
    //     closestY = p.y;
    //   } else if (yp > p.y + p.h) {
    //     closestY = p.y + p.h;
    //   } else {
    //     closestY = yp;
    //   }

      

    //   let diffX = closestX - xp;
    //   let diffY = closestY - yp;
    //   let dist = Math.sqrt(diffX * diffX + diffY * diffY);
    //   if (dist < this.r) {
    //     this.color = "red";
    //   } else {
    //     this.color = "blue";
    //   }
    // }

    // this.game.projectiles.forEach(p => {
    //   // angle between center of rectangle and center of circle
    //   let dx = this.x - p.x + p.w / 2;
    //   let dy = this.y - p.y + p.h / 2;
    //   let theta = -p.angle;
    //   // let theta = Math.PI/4;
    //   // center x of rectangle
    //   let originX = p.x + p.w / 2;
    //   let originY = p.y + p.h / 2;
    //   let cx = this.x;
    //   let cy = this.y;

    //   let xp = Math.cos(theta) * (cx - originX) - Math.sin(theta) * (cy - originY) + originX;
    //   let yp = Math.sin(theta) * (cx - originX) + Math.cos(theta) * (cy - originY) + originY;

    //   let closestX, closestY;
    //   if (xp < p.x) {
    //     closestX = p.x;
    //   } else if (xp > p.x + p.w) {
    //     closestX = p.x + p.w;
    //   } else {
    //     closestX = xp;
    //   }

    //   if (yp < p.y) {
    //     closestY = p.y;
    //   } else if (yp > p.y + p.h) {
    //     closestY = p.y + p.h;
    //   } else {
    //     closestY = yp;
    //   }

      

    //   let diffX = closestX - xp;
    //   let diffY = closestY - yp;
    //   let dist = Math.sqrt(diffX * diffX + diffY * diffY);
    //   if (dist < this.r) {
    //     this.color = "red";
    //   } else {
    //     this.color = "blue";
    //   }
    // });
