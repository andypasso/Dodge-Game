/* eslint-disable import/prefer-default-export */
class preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('loading', 'assets/sprites/loading.png');
    this.load.image('separator', 'assets/sprites/separator.png');
    this.load.bitmapFont('font', 'assets/fonts/font.png',
      'assets/fonts/font.fnt');
  }

  create() {
    this.add.bitmapText(this.game.config.width * 0.5, 610, 'font',
      'loading...', 42).setOrigin(0.5, 0.5);
    this.add.sprite(this.game.config.width * 0.5, 450, 'loading').setScale(0.2);


    const getHi = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JyCID2FeFQ5q9uisgHo5/scores')
      .then((response) => response.json())
      .then((json) => {
        json.result.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          }
          if (a.score > b.score) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        window.hiScores = json.result;
        this.scene.start('TitleScreen');
      });

    getHi();
  }
}
export { preload };
