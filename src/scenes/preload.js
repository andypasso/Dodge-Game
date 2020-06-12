import { getHi } from '../getHi';

class Preload extends Phaser.Scene {
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

    const handleResponse = (json) => {
      json.result.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });
      window.hiScores = json.result;
      this.scene.start('TitleScreen');
    };

    getHi().then((json) => handleResponse(json))
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`error:${error}`));
  }
}
export { Preload };
