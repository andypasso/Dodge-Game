class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('loading', 'assets/sprites/loading.png');
  }

  create() {
    this.scene.start('Preload');
  }
}

export { Boot };