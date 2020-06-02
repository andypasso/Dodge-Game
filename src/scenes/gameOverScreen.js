export class gameOverScreen extends Phaser.Scene{
    constructor(){
        super("GameOverScreen");
    }
    create(){

            const bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a,
                0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
    
            const titleBG = this.add.tileSprite(this.game.config.width * 0.5,this.game.config.height * 0.5,
                             this.game.config.width , this.game.config.height,"backsplash");
                             
            titleBG.setTint(bgColors[Math.floor((bgColors.length) * Math.random())])
            this.add.bitmapText(this.game.config.width / 2, 50 , "font", "Your score",
            48).setOrigin(0.5,0.5);
            this.add.bitmapText(this.game.config.width / 2, 150 , "font", score.toString(),
            72).setOrigin(0.5,0.5);;
            
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