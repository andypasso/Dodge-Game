class preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {

  }

  create() {
    this.scene.start('TitleScreen');
  }
}

export { preload };