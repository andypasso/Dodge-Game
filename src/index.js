import 'phaser';
import { boot } from './scenes/boot';
import { titleScreen } from './scenes/titleScreen';
import { playGame } from './scenes/playGame';
import { gameOverScreen } from './scenes/gameOverScreen';
import { preload } from './scenes/preload';
import { howToPlay } from './scenes/howToPlay'

var game;
const localStorageName = "doublelanegame";
const bgColors = [0x54c7fc, 0xffcd00, 0xff2851, 0x62bd18];


window.onload = () => {
    var gameConfig = {
        type: Phaser.WEBGL,
        width: 480,
        height: 960,
        backgroundColor: "black",

        scene: [ boot, preload, titleScreen, howToPlay, playGame, gameOverScreen ],
        pixelArt: true,
        roundPixels: true      
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

const resizeGame = ()=> {
    const canvas = document.querySelector("canvas");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

