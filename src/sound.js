import * as PIXI from 'pixi';
import 'pixi-sound';

const phaser = function() {
  const rnd = Math.floor(Math.random() * 3);
  return PIXI.sound.Sound.from(`assets/sound/phaser${rnd}.wav`);
};

const explode = function() {
  const rnd = Math.floor(Math.random() * 3);
  return PIXI.sound.Sound.from(`assets/sound/explode${rnd}.wav`);
};

export default {
  phaser,
  explode,
};