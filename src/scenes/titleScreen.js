import { playGame } from "./playGame";

export class titleScreen extends Phaser.Scene {
    constructor() {
        super("TitleScreen");
    }
    preload() {
        this.load.image("title", "assets/sprites/title.png");
        this.load.image("playbutton", "assets/sprites/playbutton.png");
        this.load.image("backsplash", "assets/sprites/backsplash.png");
    }
    create() {
        const bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
            0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];

        const titleBG = this.add.tileSprite(this.game.config.width * 0.5,this.game.config.height * 0.5,
                         this.game.config.width , this.game.config.height,"backsplash");
                         
        titleBG.setTint(bgColors[Math.floor((bgColors.length) * Math.random())])


        this.add.image(this.game.config.width * 0.5, 210, "title");
        
        const sprite = this.add.sprite(this.game.config.width * 0.5, this.game.config.height - 250, 'playbutton').setInteractive();

        sprite.on('pointerover', function (event) {

            this.setTint('#00f');

        });

        sprite.on('pointerout', function (event) {

            this.clearTint();
        })

        sprite.on('pointerdown', function (event) {
            this.scene.start('PlayGame');
        }, this);

    }

}
