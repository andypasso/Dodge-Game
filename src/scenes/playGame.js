export class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
    this.load.image("wall", "assets/sprites/wall.png");
    this.load.image("ship", "assets/sprites/ship.png")
    this.load.image("smoke", "assets/sprites/smoke.png");
  }

  create() {
    const tunnelWidth = 256;

    const bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
      0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
    const tintColor = bgColors[Math.floor((bgColors.length) * Math.random())]

    const leftWallBG = this.add.tileSprite(0, this.game.config.height * 0.5, this.game.config.width / 2, this.game.config.height, "wall");
    leftWallBG.setTint(tintColor)


    const rightWallBG = this.add.tileSprite(this.game.config.width, this.game.config.height * 0.5, this.game.config.width /
      2, this.game.config.height, "wall");
    rightWallBG.setTint(tintColor)


    const tunnelBG = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5, tunnelWidth, this.game.config.height, "tunnelbg")
    tunnelBG.setTint(tintColor)

    //adding the ship

    const shipHorizontalSpeed = 100;
    const shipVerticalSpeed = 15000;

    this.shipPositions = [(this.game.config.width - tunnelWidth) / 2 + 32, (this.game.config.width + tunnelWidth) / 2 - 32];
    const ship = this.add.sprite(this.shipPositions[0], 860, "ship");
    ship.side = 0;
    ship.canMove = true
    ship.setOrigin(0.5, 0.5);

    //movement Right
    const tweenR = this.tweens.add({
      targets: ship,
      x: this.shipPositions[1],
      paused: true,
      duration: shipHorizontalSpeed,
      yoyo: false
    });
    // movement Left
    const tweenL = this.tweens.add({
      targets: ship,
      x: this.shipPositions[0],
      paused: true,
      duration: shipHorizontalSpeed,
      yoyo: false
    });
    //move Up
    const tweenUp = this.tweens.add({
      targets: ship,
      y:0,
      paused: true,
      duration: shipVerticalSpeed,
      yoyo: false
    });
    tweenUp.play();
    


    this.input.on('pointerdown', function () {
      if (ship.canMove) {
        ship.canMove = false;

        if (ship.side === 0) {
          tweenR.play();
          ship.side = 1 - ship.side;
          ship.canMove = true;
          console.log(ship.side)
        }
        else {
          tweenL.play();
          ship.side = 1 - ship.side;
          ship.canMove = true;
          console.log(ship.side)
        }
      }

    })

    console.log("this is my awesome game");

    const particles = this.add.particles('smoke');
    const fueguito = {
      quantity:0.5,
      speedX: { min: -15, max: 15 },
      speedY: { min: 50, max: 150 },
      alpha: { min: 0, max: 1 },
      scale: {start:1, end:0.5},
      gravityY: 300
  }
    const emitter = particles.createEmitter(fueguito);

    emitter.startFollow(ship)
  }

  update(){

  }
}
