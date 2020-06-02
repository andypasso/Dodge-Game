import 'phaser';
import { boot } from './scenes/boot';
import { titleScreen } from './scenes/titleScreen';
import { playGame } from './scenes/playGame';
import { gameOverScreen } from './scenes/gameOverScreen';
import { preload } from './scenes/preload';
import { howToPlay } from './scenes/howToPlay';
import { Barrier } from './barriers';
import 'phaser3-swipe' ;

var game;
const localStorageName = "doublelanegame";
const bgColors = [0x54c7fc, 0xffcd00, 0xff2851, 0x62bd18];

window.score = 0

window.onload = () => {
    var gameConfig = {
        type: Phaser.WEBGL,
        width: 480,
        height: 960,
        physics: {
            default: "arcade",
            arcade: {
              gravity: { x: 0, y: 0 }
            }
          },

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

// fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JyCID2FeFQ5q9uisgHo5/scores')
// .then((response) => {
//     return response.json();
// })
// .then((myJson) => {
//     let scoresGlobalArrays=[]
//   myJson.result.forEach(element => {
    
//         scoresGlobalArrays.push(element.score);
//   });
//   window.hiScore = Math.max(...scoresGlobalArrays)  });


fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JyCID2FeFQ5q9uisgHo5/scores')
  .then((response) => {
      return response.json();
  })
  .then((myJson) => {
      let scoresArrays = []
      
      myJson.result.forEach(element => {
          
          scoresArrays.push(element.score);
      })
      let maxScore = Math.max(...scoresArrays)
      let maxScorePlayer 
      myJson.result.forEach(element => {
          if(element.score===maxScore){
          maxScorePlayer = element.user
          }
      })

      window.hiScore = Math.max(...scoresArrays)
      window.hiPlayer = maxScorePlayer
  });