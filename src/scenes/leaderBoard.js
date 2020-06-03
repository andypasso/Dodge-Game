class leaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
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


    this.add.bitmapText(this.game.config.width * 0.5, 150, 'font', `1.- ${hiScores[0].user} `, 60).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width * 0.5, 220, 'font', hiScores[0].score, 60).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 320, 'font', `2.- ${hiScores[1].user} `, 42).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width * 0.5, 370, 'font', hiScores[1].score, 42).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 440, 'font', `3.- ${hiScores[2].user} `, 32).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width * 0.5, 480, 'font', hiScores[2].score, 32).setOrigin(0.5, 0.5);

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

export { leaderBoard };
