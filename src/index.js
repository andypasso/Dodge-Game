import 'phaser';
import { boot } from './scenes/boot';
import { titleScreen } from './scenes/titleScreen';
import { playGame } from './scenes/playGame';
import { gameOverScreen } from './scenes/gameOverScreen';
import { preload } from './scenes/preload';
import { howToPlay } from './scenes/howToPlay';
import 'phaser3-swipe';

let game;

window.score = 0;

window.onload = () => {
  const gameConfig = {
    type: Phaser.WEBGL,
    width: 480,
    height: 960,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
      },
    },

    scene: [boot, preload, titleScreen, howToPlay, playGame, gameOverScreen],
    pixelArt: true,
    roundPixels: true,
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resizeGame();
  window.addEventListener('resize', resizeGame);
};

const resizeGame = () => {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};

fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JyCID2FeFQ5q9uisgHo5/scores')
  .then((response) => response.json())
  .then((json) => {
    const scoresArrays = [];

    json.result.forEach(element => {
      scoresArrays.push(element.score);
    });
    const maxScore = Math.max(...scoresArrays);
    let maxScorePlayer;
    json.result.forEach(element => {
      if (element.score === maxScore) {
        maxScorePlayer = element.user;
      }
    });

    window.hiScore = Math.max(...scoresArrays);
    window.hiPlayer = maxScorePlayer;
  });