export class Barrier extends Phaser.GameObjects.Sprite {
 constructor (config, tunnelWidth, tintColor, speed) {
     super(config.scene, config.x, config.y, "barrier")
    
    this.scene.physics.world.enableBody(this, 0);
    this.tint = tintColor;
    this.body.velocity.y = speed;
    this.body.immovable = true;
    config.scene.add.existing(this);

}
}
