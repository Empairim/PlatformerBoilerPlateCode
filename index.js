// alot of files so gonna have a load function before running anything
window.addEventListener("load", function () {
  //canvas setup
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1500;
  canvas.height = 500;

  class InputHandler {}
  class Projectile {}
  class Particle {}
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0; //vertical movement
    }
    update() {
      this.y += this.speedY;
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  class Layer {}
  class Background {}
  class UI {}
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this); // This allows you to have multiple instances of the Game class, each with its own set of players, and they won't interfere with each other.
    }
    update() {
      this.player.update();
    }
    draw() {
      this.player.draw(context); //it take this param above so has to here
    }
  }
  const game = new Game(canvas.width, canvas.height);
  // animation/game loop
  function animate() {}
});
