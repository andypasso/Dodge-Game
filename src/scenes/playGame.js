import { Barrier } from '../barriers';

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  preload() {
    this.load.image('tunnelbg', 'assets/sprites/tunnelbg.png');
    this.load.image('wall', 'assets/sprites/wall.png');
    this.load.image('ship', 'assets/sprites/ship.png');
    this.load.image('smoke', 'assets/sprites/smoke.png');
    this.load.image('barrier', 'assets/sprites/barrier.png');
    this.load.plugin('Phaser3Swipe', Phaser3Swipe, true);

    this.load.image('separator', 'assets/sprites/separator.png');
    this.load.bitmapFont('font', 'assets/fonts/font.png',
      'assets/fonts/font.fnt');
  }

  create() {
    const friendlyBarRatio = 15;
    score = 0;
    const swipe = this.plugins.get('Phaser3Swipe');
    swipe.cargar(this);

    const tunnelWidth = 256;

    const bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
      0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
    const tintColor = bgColors[Math.floor((bgColors.length) * Math.random())];

    const leftWallBG = this.add.tileSprite(0, this.game.config.height * 0.5, this.game.config.width / 2, this.game.config.height, 'wall');
    leftWallBG.setTint(tintColor);


    const rightWallBG = this.add.tileSprite(this.game.config.width,
      this.game.config.height * 0.5, this.game.config.width
    / 2, this.game.config.height, 'wall');
    rightWallBG.setTint(tintColor);


    const tunnelBG = this.add.tileSprite(this.game.config.width * 0.5,
      this.game.config.height * 0.5, tunnelWidth, this.game.config.height, 'tunnelbg');

    tunnelBG.setTint(tintColor);

    const shipHorizontalSpeed = 100;
    const shipVerticalSpeed = 15000;
    let barrierSpeed = 280;
    const barrierIncreaseSpeed = 1.1;


    this.shipPositions = [(this.game.config.width - tunnelWidth) / 2 + 32,
      (this.game.config.width + tunnelWidth) / 2 - 32];
    const ship = this.physics.add.sprite(this.shipPositions[0], 860, 'ship');
    ship.destroyed = false;
    ship.side = 0;
    ship.canMove = true;
    ship.canSwipe = true;
    ship.setOrigin(0.5, 0.5);

    this.ship = ship;

    // movement Right
    const tweenR = this.tweens.add({
      targets: ship,
      x: this.shipPositions[1],
      paused: true,
      duration: shipHorizontalSpeed,
      yoyo: false,
    });
    // movement Left
    const tweenL = this.tweens.add({
      targets: ship,
      x: this.shipPositions[0],
      paused: true,
      duration: shipHorizontalSpeed,
      yoyo: false,
    });
    // move Up
    const tweenUp = this.tweens.add({
      targets: ship,
      y: 0,
      paused: true,
      duration: shipVerticalSpeed,
      yoyo: false,
    });

    // move Down
    const tweenDown = this.tweens.add({
      targets: ship,
      y: 860,
      paused: true,
      duration: shipHorizontalSpeed,
      yoyo: false,
    });

    tweenUp.play();

    // inputs
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);


    // swipe
    this.events.on('swipe', (e) => {
      if (e.up) {
        if (ship.alpha === 1) {
          ship.alpha = 0.5;
          this.highlightBar.visible = false;
          barrierSpeed *= barrierIncreaseSpeed;
          for (let i = 0; i < this.barrierGroup.getChildren().length; i += 1) {
            this.barrierGroup.getChildren()[i].body.velocity.y = barrierSpeed;
          }

          tweenUp.stop();
          tweenDown.play();
          setTimeout(() => { tweenUp.play(); }, 110);
          setTimeout(() => { ship.alpha = 1; }, 1000);
        }
      }
    });

    this.keyShift.on('down', () => {
      if (ship.alpha === 1) {
        ship.alpha = 0.5;
        this.highlightBar.visible = false;
        barrierSpeed *= barrierIncreaseSpeed;
        for (let i = 0; i < this.barrierGroup.getChildren().length; i += 1) {
          this.barrierGroup.getChildren()[i].body.velocity.y = barrierSpeed;
        }

        tweenUp.stop();
        tweenDown.play();
        setTimeout(() => { tweenUp.play(); }, 110);
        setTimeout(() => { ship.alpha = 1; }, 1000);
      }
    });


    this.input.on('pointerdown', () => {
      if (ship.canMove) {
        ship.canMove = false;

        if (ship.side === 0) {
          tweenR.play();
          ship.side = 1 - ship.side;
          ship.canMove = true;
        } else {
          tweenL.play();
          ship.side = 1 - ship.side;
          ship.canMove = true;
        }
      }
    });

    this.keySpace.on('down', () => {
      if (ship.canMove) {
        ship.canMove = false;

        if (ship.side === 0) {
          tweenR.play();
          ship.side = 1 - ship.side;
          ship.canMove = true;
        } else {
          tweenL.play();
          ship.side = 1 - ship.side;
          ship.canMove = true;
        }
      }
    });

    // ship following particles emitter
    const particles = this.add.particles('smoke');
    const fueguito = {
      quantity: 0.5,
      speedX: { min: -15, max: 15 },
      speedY: { min: 50, max: 150 },
      alpha: { min: 0, max: 1 },
      scale: { start: 1, end: 0.5 },
      gravityY: 300,
    };
    const emitter = particles.createEmitter(fueguito);

    emitter.startFollow(ship);

    // explosion emitter

    const particles2 = this.add.particles('smoke');
    const fueguito2 = {
      quantity: 20,
      speed: { min: -800, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 2 },
      blendMode: 'SCREEN',
      lifespan: 400,
    };

    // barriers

    const positions = [(this.game.config.width - tunnelWidth) / 2,
      (this.game.config.width + tunnelWidth)
    / 2];
    this.barrierGroup = this.add.group();


    this.time.addEvent({
      delay: 700,
      callback() {
        this.barrier = new Barrier({
          scene: this,
          x: positions[Math.floor((positions.length) * Math.random())],
          y: -100,
        },
        tintColor,
        barrierSpeed,
        friendlyBarRatio);
        this.barrierGroup.add(this.barrier);
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(ship, this.barrierGroup, (s, b) => {
      if (!ship.destroyed && ship.alpha === 1) {
        if (!b.friendly) {
          const emitter2 = particles2.createEmitter(fueguito2);
          emitter2.startFollow(ship);
          ship.destroy();
          particles.destroy();
          setTimeout(() => { particles2.destroy(); }, 510);
          setTimeout(() => { ship.destroyed = true; }, 510);
        } else if (b.alpha === 1) {
          b.alpha = 0.2;
          score *= 2;
        }
      }
    });

    // working on scores

    const scoreHeight = 100;
    const scoreSegments = [100, 50, 25, 10, 5, 2, 1];
    this.scoreHeight = scoreHeight;
    this.scoreSegments = scoreSegments;


    for (let i = 1; i <= scoreSegments.length; i += 1) {
      const leftSeparator = this.add.sprite((this.game.config.width - tunnelWidth) / 2,
        scoreHeight * i, 'separator');
      leftSeparator.tint = tintColor;
      leftSeparator.setOrigin(1, 0);
      const rightSeparator = this.add.sprite((this.game.config.width + tunnelWidth)
        / 2, scoreHeight * i, 'separator');
      rightSeparator.tint = tintColor;
      rightSeparator.setOrigin(0, 0);

      let posX = (this.game.config.width - tunnelWidth) / 2 - leftSeparator.width / 2;
      if (i % 2 === 0) {
        posX = (this.game.config.width + tunnelWidth) / 2 + leftSeparator.width / 2;
      }

      this.add.bitmapText(posX, scoreHeight * (i - 1) + scoreHeight / 2 - 18, 'font',
        scoreSegments[i - 1].toString(), 36).setOrigin(0.5, 0.5);
    }

    this.highlightBar = this.add.tileSprite(this.game.config.width / 2, 0, tunnelWidth,
      scoreHeight, 'smoke');
    this.highlightBar.setOrigin(0.5, 0);
    this.highlightBar.alpha = 0.1;
    this.highlightBar.visible = false;

    this.scoreText = this.add.bitmapText(55, this.game.config.height - 90, 'font', '0', 48).setOrigin(0.5, 0.5);


    this.time.addEvent({
      delay: 250,
      callback() {
        if (this.ship.alpha === 1 && !this.ship.destroyed) {
          if (this.ship.y < scoreHeight * scoreSegments.length) {
            const row = Math.floor(this.ship.y / scoreHeight);
            score += scoreSegments[row];
            this.scoreText.text = score.toString();
          }
        }
      },
      callbackScope: this,
      loop: true,
    });
  }


  update() {
    for (let i = 0; i < this.barrierGroup.getChildren().length; i += 1) {
      const enemy = this.barrierGroup.getChildren()[i];
      enemy.update();
      if (enemy.y > this.game.config.height) {
        enemy.destroy();
      }
    }
    if (!this.ship.destroyed && this.ship.alpha === 1) {
      if (this.ship.y < this.scoreHeight * this.scoreSegments.length) {
        this.highlightBar.visible = true;
        const row = Math.floor(this.ship.y / this.scoreHeight);
        this.highlightBar.y = row * this.scoreHeight;
      }
    }


    if (this.ship.destroyed === true) {
      this.scene.start('GameOverScreen');
    }
  }
}

export { PlayGame };