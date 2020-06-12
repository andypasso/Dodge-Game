import 'phaser';
import 'phaser3-swipe';
import { Boot } from './scenes/boot';
import { TitleScreen } from './scenes/titleScreen';
import { PlayGame } from './scenes/playGame';
import { GameOverScreen } from './scenes/gameOverScreen';
import { Preload } from './scenes/preload';
import { HowToPlay } from './scenes/howToPlay';
import { LeaderBoard } from './scenes/leaderBoard';

let game;
window.hiScores = {};
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

    scene: [Boot, Preload, TitleScreen, HowToPlay, PlayGame, GameOverScreen, LeaderBoard],
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