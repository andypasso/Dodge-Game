class Barrier extends Phaser.GameObjects.Sprite {
  constructor(config, tunnelWidth, tintColor, speed, friendlyBarRatio) {
    super(config.scene, config.x, config.y, 'barrier');

    this.scene.physics.world.enableBody(this, 0);
    this.body.velocity.y = speed;
    this.body.immovable = true;
    config.scene.add.existing(this);

    if (Math.floor((friendlyBarRatio) * Math.random()) !== 0) {
      this.friendly = false;
      this.tint = tintColor;
    } else {
      this.friendly = true;
    }
  }
}

export { Barrier };