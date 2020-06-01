import { Barrier } from '../barriers';

export class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
    this.load.image("wall", "assets/sprites/wall.png");
    this.load.image("ship", "assets/sprites/ship.png")
    this.load.image("smoke", "assets/sprites/smoke.png");
    this.load.image("barrier", "assets/sprites/barrier.png");
    this.load.plugin("Phaser3Swipe", Phaser3Swipe, true);

    

  }

  create() {

    let swipe = this.plugins.get('Phaser3Swipe');
    swipe.cargar(this);

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
    let barrierSpeed = 280;
    const barrierIncreaseSpeed = 1.1



    this.shipPositions = [(this.game.config.width - tunnelWidth) / 2 + 32, (this.game.config.width + tunnelWidth) / 2 - 32];
    const ship = this.physics.add.sprite(this.shipPositions[0], 860, "ship");
    ship.destroyed = false;
    ship.side = 0;
    ship.canMove = true;
    ship.canSwipe = true;
    ship.setOrigin(0.5, 0.5);

    this.ship = ship

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
      y: 0,
      paused: true,
      duration: shipVerticalSpeed,
      yoyo: false,
      // repeat: -1,
    });

    //move Down
    const tweenDown = this.tweens.add({
      targets: ship,
      y: 860,
      paused: true,
      duration: shipHorizontalSpeed,
      yoyo: false,
      // onComplete: tweenUp.play()
    });

    tweenUp.play();

    // swipe
    this.events.on("swipe", (e) => {
      if (e.right) {
        tweenUp.stop();
        console.log("Hacer algo a la derecha");
      }
      else if (e.left) {
        tweenUp.play();
        console.log("Hacer algo a la izquierda");
      }
      else if (e.up) {
        if (ship.alpha==1) {
          ship.alpha=0.5;
          console.log(barrierSpeed)
          barrierSpeed *= barrierIncreaseSpeed;
          for(var i = 0; i < this.barrierGroup.getChildren().length; i++){
            this.barrierGroup.getChildren()[i].body.velocity.y = barrierSpeed;
          }

        tweenUp.stop();
        tweenDown.play();
        setTimeout(() => { tweenUp.play() }, 110);
        setTimeout(() => { ship.alpha=1 }, 1000);

        }

        console.log("Hacer algo a la arriba");
      }
      else if (e.down) {
        console.log("Hacer algo a la abajo");
      }
    })


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

    // ship following particles emitter
    const particles = this.add.particles('smoke');
    const fueguito = {
      quantity: 0.5,
      speedX: { min: -15, max: 15 },
      speedY: { min: 50, max: 150 },
      alpha: { min: 0, max: 1 },
      scale: { start: 1, end: 0.5 },
      gravityY: 300
    }
    const emitter = particles.createEmitter(fueguito);

    emitter.startFollow(ship)

    // explosion emitter 

    const particles2 = this.add.particles('smoke');
    const fueguito2 = {
      quantity: 20,
      speed: { min: -800, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 2 },
      blendMode: 'SCREEN',
      lifespan: 400,
      // speed:200,
      // lifespan:500,
      // blendMode:'ADD',
      // scale:{start:1 ,end:0},

    }
    // barriers
    const positions = [(this.game.config.width - tunnelWidth) / 2, (this.game.config.width + tunnelWidth) /
      2];
    this.barrierGroup = this.add.group();


    this.time.addEvent({
      delay: 700,
      callback: function () {
        this.barrier = new Barrier({ scene: this, x: positions[Math.floor((positions.length) * Math.random())], y: -100 }, tunnelWidth, tintColor, barrierSpeed);
        this.barrierGroup.add(this.barrier);
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(ship, this.barrierGroup, function (s, b) {

      if (!ship.destroyed && ship.alpha===1) {
        ship.destroyed = true;
        const emitter2 = particles2.createEmitter(fueguito2);
        emitter2.startFollow(ship);
        ship.destroy();
        particles.destroy();
        setTimeout(() => { particles2.destroy() }, 510);
      }
    })
  }

  update() {




    for (var i = 0; i < this.barrierGroup.getChildren().length; i++) {
      var enemy = this.barrierGroup.getChildren()[i];
      enemy.update();
      if (enemy.y > this.game.config.height) {
        console.log('barrier detroyed')
        enemy.destroy();
      }

    }
    if (this.ship.destroyed == true) {
      setTimeout(() => { this.scene.start("GameOverScreen") }, 510);


    }


  }
}