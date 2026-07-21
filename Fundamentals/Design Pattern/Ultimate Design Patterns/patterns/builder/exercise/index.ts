import { Game } from './game';

const game: Game = new Game.Builder()
  .setControl('good')
  .setGraphics('best')
  .setSound('low')
  .build();

console.log(game.sound);
