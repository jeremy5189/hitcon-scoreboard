import * as PIXI from 'pixi';

const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 60,
  fontWeight: 'bold',
  fill: ['#ffffff', '#4d84f9'], // gradient
  stroke: '#1456e1',
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

const day = new PIXI.Text('Day 0', style);
const hour = new PIXI.Text('00:00', style);

day.x = 25;
day.y = 25;

// Top Right
hour.x = 1920 - 260;
hour.y = 25;

export default {
  day,
  hour,
};