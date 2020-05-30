export class boot extends Phaser.Scene {
    constructor() {
        super("Boot");
    }
    preload() {
        this.load.image("loading", "assets/sprites/loading.png");
    }
    create() {
        console.log("game booting");

        this.scene.start("Preload");

    }
}