export class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
    this.load.image('cokecan', 'assets/coke.png');
  }
  


  create() {


    this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    this.add.image(100, 200, 'cokecan');



    console.log("this is my awesome game");

  }
}