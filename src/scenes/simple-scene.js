export class SimpleScene extends Phaser.Scene {
    preload() {
      this.load.spritesheet("sprBat", "assets/32x32-bat-sprite", {
        frameWidth: 32,
        frameHeight: 32
      });
    }
    create() {
      this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });

    }
  }