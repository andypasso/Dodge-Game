export class preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }

    preload(){
    }

    create(){
        console.log("preloading");
        this.scene.start("TitleScreen");
    }
  }