// alot of files so gonna have a load function before running anything
window.addEventListener("load", function () {
  //canvas setup
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1500;
  canvas.height = 500;
  
  // Improved version of my player handler from last game
  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (event) => {
        //so key is only added once to keys array
        if (
          (event.key === "ArrowUp" || event.key === "ArrowDown") &&
          this.game.keys.indexOf(event.key) === -1
        ) {
          this.game.keys.push(event.key);
        } else if (event.key === " ") {
          //spacebar
          this.game.player.shootTop();
        }
      });
      window.addEventListener("keyup", (event) => {
        if (this.game.keys.indexOf(event.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
        }
      });
    }
  }
  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 20;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  class Particle {}
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0; //vertical movement
      this.maxSpeed = 5;
      this.projectiles = [];
    }
    update() {
      if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
      else if (this.game.keys.includes("ArrowDown"))
        this.speedY = this.maxSpeed;
      else this.speedY = 0;
      this.y += this.speedY;
      // handling projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
    }
    draw(context) {
      context.fillStyle = "black";
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
    }
    shootTop() {
      if (this.game.ammo > 0){
      this.projectiles.push(new Projectile(this.game, this.x, this.y + 30));
      this.game.ammo--;
     }
    }
  }
  class Layer {}
  class Background {}
  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 30;
      this.fontFamily = "Helvetica";
      this.color = "gold";
    }
    
    draw(context) {
      //draw ammo
      context.fillStyle = this.color;
      for (let i = 0;i < this.game.ammo;i++){
        context.fillRect(20+ 5 * i, 50, 3, 20)
      }
    }
  }
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this); // This allows you to have multiple instances of the Game class, each with its own set of players, and they won't interfere with each other.
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = []; //saves all key presses and allows me to pass it to the player class as well
      this.ammo = 20
      this.maxAmmo = 50
      this.ammoTimer = 0
      this.ammoInterval = 500;
    }
    update(deltaTime) {
      this.player.update();
      if(this.ammoTimer > this.ammoInterval){
        if(this.ammo < this.maxAmmo) this.ammo++
        this.ammoTimer = 0 //reset timer and the above if statement will add ammo if less than max
      } else {
        this.ammoTimer += deltaTime
      } // this is so we can use the deltaTime in the update method to track ammo timer
    }
    draw(context) {
      this.player.draw(context); //it take this param above so has to here
      this.ui.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0
  // animation/game loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp // this is so we can use the deltaTime in the update method
    ctx.clearRect(0, 0, canvas.width, canvas.height); // will clear the canvas b4 loop
    game.update(deltaTime);
    game.draw(ctx); // this is telling where we want it drawn then passes it back to the game/player class draw methods
    requestAnimationFrame(animate);//this function has timeStamps built in
  }
  animate(0);
});
