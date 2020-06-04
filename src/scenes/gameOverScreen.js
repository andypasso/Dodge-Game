class gameOverScreen extends Phaser.Scene {
  constructor() {
    super('GameOverScreen');
  }

  preload() {
    this.load.image('leaderboard', 'assets/sprites/leaderboard.png');
  }

  create() {
    const bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
      0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];

    const titleBG = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5,
      this.game.config.width, this.game.config.height, 'backsplash');

    titleBG.setTint(bgColors[Math.floor((bgColors.length) * Math.random())]);
    this.add.bitmapText(this.game.config.width / 2, 50, 'font', 'Your score',
      48).setOrigin(0.5, 0.5);
    this.add.bitmapText(this.game.config.width / 2, 150, 'font', score.toString(),
      72).setOrigin(0.5, 0.5);

    const sprite2 = this.add.sprite(this.game.config.width * 0.5, 250, 'leaderboard').setInteractive();


    sprite2.on('pointerover', () => {
      sprite2.setTint(bgColors[Math.floor((bgColors.length) * Math.random())]);
    });

    sprite2.on('pointerout', () => {
      sprite2.clearTint();
    });

    sprite2.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
    }, this);


    const sprite = this.add.sprite(this.game.config.width * 0.5, this.game.config.height - 250, 'playbutton').setInteractive();
    sprite2.setScale(1.5);
    sprite.on('pointerover', () => {
      sprite.setTint(bgColors[Math.floor((bgColors.length) * Math.random())]);
    });

    sprite.on('pointerout', () => {
      sprite.clearTint();
    });

    sprite.on('pointerdown', () => {
      this.scene.start('PlayGame');
    }, this);

    const data = { user: '', score: '' };
    const name = window.prompt('Enter your name: ');

    data.user = name;
    data.score = score;

    const post = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xYFwEP6ZAX6KvJiGNbzB/scores', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(() => {
      if (score > hiScores[0].score) {
        this.add.bitmapText(this.game.config.width * 0.5, 350, 'font',
          'Highest Score', 34).setOrigin(0.5, 0.5);

        this.add.bitmapText(this.game.config.width * 0.5, 400, 'font',
          score, 54).setOrigin(0.5, 0.5);

        this.add.bitmapText(this.game.config.width * 0.5, 450, 'font',
          'by', 24).setOrigin(0.5, 0.5);

        this.add.bitmapText(this.game.config.width * 0.5, 500, 'font',
          name, 34).setOrigin(0.5, 0.5);
      } else {
        this.add.bitmapText(this.game.config.width * 0.5, 350, 'font',
          'Highest Score', 34).setOrigin(0.5, 0.5);

        this.add.bitmapText(this.game.config.width * 0.5, 400, 'font',
          hiScores[0].score, 54).setOrigin(0.5, 0.5);

        this.add.bitmapText(this.game.config.width * 0.5, 450, 'font',
          'by', 24).setOrigin(0.5, 0.5);

        this.add.bitmapText(this.game.config.width * 0.5, 500, 'font',
          hiScores[0].user, 34).setOrigin(0.5, 0.5);
      }
    });

    if (name != null) {
      post();
    } else {
      this.add.bitmapText(this.game.config.width * 0.5, 350, 'font',
        'Highest Score', 34).setOrigin(0.5, 0.5);

      this.add.bitmapText(this.game.config.width * 0.5, 400, 'font',
        hiScores[0].score, 54).setOrigin(0.5, 0.5);

      this.add.bitmapText(this.game.config.width * 0.5, 450, 'font',
        'by', 24).setOrigin(0.5, 0.5);

      this.add.bitmapText(this.game.config.width * 0.5, 500, 'font',
        hiScores[0].user, 34).setOrigin(0.5, 0.5);
    }
  }
}
export { gameOverScreen };
