class titleScreen extends Phaser.Scene {
  constructor() {
    super('TitleScreen');
  }

  preload() {
    this.load.image('title', 'assets/sprites/title.png');
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

    document.body.style.background = `#${titleBG.tintBottomLeft.toString}`;

    this.add.bitmapText(this.game.config.width * 0.5, 210, 'font',
      'My Awesome Game', 54).setOrigin(0.5, 0.5);

    // fetch highest score and post it on main screen

    // const getResult = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JyCID2FeFQ5q9uisgHo5/scores')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((myJson) => {
    //         let scoresArrays = []

    //         myJson.result.forEach(element => {

    //             scoresArrays.push(element.score);
    //         })
    //         let maxScore = Math.max(...scoresArrays)
    //         let maxScorePlayer
    //         myJson.result.forEach(element => {
    //             if(element.score===maxScore){
    //             maxScorePlayer = element.user
    //             }
    //         })
    //         console.log(maxScorePlayer)

    //         this.add.bitmapText(this.game.config.width * 0.5, 400, "font",
    //             Math.max(...scoresArrays), 54).setOrigin(0.5, 0.5);
    //         console.log( Math.max(...scoresArrays));
    //         this.add.bitmapText(this.game.config.width * 0.5, 450, "font",
    //         "by", 24).setOrigin(0.5, 0.5);
    //         this.add.bitmapText(this.game.config.width * 0.5, 500, "font",
    //         maxScorePlayer, 34).setOrigin(0.5, 0.5);
    //     });


    this.add.bitmapText(this.game.config.width * 0.5, 350, 'font',
      'Highest Score', 34).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 400, 'font',
      hiScore, 54).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 450, 'font',
      'by', 24).setOrigin(0.5, 0.5);

    this.add.bitmapText(this.game.config.width * 0.5, 500, 'font',
      hiPlayer, 34).setOrigin(0.5, 0.5);


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

export { titleScreen };