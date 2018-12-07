import * as PIXI from 'pixi';

let stars_texture = PIXI.Texture.fromImage('assets/stars.jpg');
let stars = new PIXI.Sprite(stars_texture);

stars.x = 0;
stars.y = 0;

export default stars;