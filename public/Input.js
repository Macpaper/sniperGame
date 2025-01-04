export default class Input {
  constructor(game, player) {
    this.game = game;
    this.player = player;

    document.addEventListener("mousedown", e => {
      if (e.button == 0) {
      this.player.shooting = true;
      }

    });

    document.addEventListener("mouseup", e => {
      if (e.button == 0) {
        this.player.shooting = false;
      }
    });
    document.addEventListener("mousemove", e => {
      this.player.mouseX = e.clientX;
      this.player.mouseY = e.clientY;
    });

    document.addEventListener("keydown", e => {
      this.handleKeys(e.key, true);
    });
    document.addEventListener("keyup", e => {
      this.handleKeys(e.key, false);
    });
  }
  handleKeys(key, isPressed) {
    if (key.toLowerCase() == 'w') {
      this.player.up = isPressed; 
    }
    else if (key.toLowerCase() == 'a') {
      this.player.left = isPressed; 
    }
    else if (key.toLowerCase() == 's') {
      this.player.down = isPressed; 
    }
    else if (key.toLowerCase() == 'd') {
      this.player.right = isPressed; 
    }
    else if (key == 'ArrowLeft') {
      // this.game.rotatingRect.rotateLeft = isPressed;
      this.game.projectiles.forEach(c => {
        c.rotateLeft = isPressed;
      });
    }
    else if (key == 'ArrowRight') {
      // this.game.rotatingRect.rotateRight = isPressed;
      this.game.projectiles.forEach(c => {
        c.rotateRight = isPressed;
      });
    }

    
  }
}