class HowToPlay extends Phaser.Scene {
  constructor() {
    super('HowToPlay');
  }

  preload() {
    this.load.image('playbutton', 'assets/sprites/playbutton.png');
    this.load.image('backsplash', 'assets/sprites/backsplash.png');
    this.load.image('ship', 'assets/sprites/ship.png');

    this.load.image('separator', 'assets/sprites/separator.png');
    this.load.bitmapFont('font', 'assets/fonts/font.png',
      'assets/fonts/font.fnt');
  }

  create() {
    const bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
      0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
    const titleBG = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5,
      this.game.config.width, this.game.config.height, 'backsplash');

    titleBG.setTint(bgColors[Math.floor((bgColors.length) * Math.random())]);

    this.add.bitmapText(this.game.config.width * 0.5, 120, 'font', 'left / right', 60).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width * 0.5, 200, 'font', 'Tap, Click or SPACEBAR key', 36).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width * 0.5, 400, 'font', 'to the bottom', 60).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width * 0.5, 480, 'font', 'Swipe up or SHIFT key', 36).setOrigin(0.5, 0.5);

    const horizontalShip = this.add.sprite(this.game.config.width * 0.5 - 50, 260, 'ship').setOrigin(0.5, 0.5);
    horizontalShip.setScale(0.5);

    const verticalShip = this.add.sprite(this.game.config.width * 0.5, 540, 'ship').setOrigin(0.5, 0.5);
    verticalShip.setScale(0.5);

    const tweenH = this.tweens.add({
      targets: horizontalShip,
      x: this.game.config.width * 0.5 + 50,
      paused: true,
      yoyo: true,
      loop: -1,
    });

    const tweenV = this.tweens.add({
      targets: verticalShip,
      y: 640,
      paused: true,
      yoyo: true,
      loop: -1,
    });
    tweenH.play();
    tweenV.play();

    const sprite = this.add.sprite(this.game.config.width * 0.5, this.game.config.height - 250, 'playbutton').setInteractive();

    sprite.on('pointerover', () => {
      sprite.setTint(bgColors[Math.floor((bgColors.length) * Math.random())]);
    });

    sprite.on('pointerout', () => {
      sprite.clearTint();
    });

    sprite.on('pointerdown', () => {
      this.scene.start('PlayGame');
    }, this);
  }
}
export { HowToPlay };
