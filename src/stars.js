import * as PIXI from 'pixi';

let stars_texture = PIXI.Texture.fromImage('assets/stars.jpg');
let stars = new PIXI.Sprite(stars_texture);

stars.x = 0;
stars.y = 0;
//stars.anchor.set(1);

export default stars;

/*import constant from './constant';

// Drawer of 2D Graphic
const graphics = new PIXI.Graphics();

var blur = new PIXI.filters.BlurFilter();
blur.blur = 3;
graphics.filters = [blur];

// Draw red ball in bottom
graphics.lineStyle(0);
graphics.beginFill(0xFFFFFF, 1);

for (let i = 0; i < 500; i++) {
    const x = Math.random() * constant.screen.w;
    const y = Math.random() * constant.screen.h;
    graphics.drawCircle(x, y, Math.random() * 5);
}

graphics.endFill();

export default graphics;*/

