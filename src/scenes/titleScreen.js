class titleScreen extends Phaser.Scene {
  constructor() {
    super('TitleScreen');
  }

  preload() {
    this.load.image('playbutton', 'assets/sprites/playbutton.png');
    this.load.image('backsplash', 'assets/sprites/backsplash.png');

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

    this.add.bitmapText(this.game.config.width * 0.5, 210, 'font',
      'My Awesome Game', 54).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 350, 'font',
      'Highest Score', 34).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 400, 'font',
      hiScores[0].score, 54).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 450, 'font',
      'by', 24).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 500, 'font',
      hiScores[0].user, 34).setOrigin(0.5, 0.5);


    const sprite = this.add.sprite(this.game.config.width * 0.5, this.game.config.height - 250, 'playbutton').setInteractive();

    sprite.on('pointerover', () => {
      sprite.setTint(bgColors[Math.floor((bgColors.length) * Math.random())]);
    });

    sprite.on('pointerout', () => {
      sprite.clearTint();
    });

    sprite.on('pointerdown', () => {
      this.scene.start('HowToPlay');
    }, this);
  }
}

export { titleScreen };
