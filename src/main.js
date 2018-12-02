import * as PIXI from 'pixi';
import * as dat from 'dat.gui';
const gui = new dat.GUI();

// Screen size
const screen = {
  w: 1920,
  h: 1080
};

// Create the renderer
//const renderer = PIXI.autoDetectRenderer(screen.w, screen.h);
var app = new PIXI.Application(screen.w, screen.h, {
  backgroundColor : 0x000
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

// Draw red team
graphics.lineStyle(0);
graphics.beginFill(0xFF5330, 1);
graphics.drawCircle(screen.w / 2, screen.h, 100);

// Draw blue team
graphics.beginFill(0x5D94FF, 1);
let texture = PIXI.Texture.fromImage(require('../assets/texture/bunny.png'));
let radius = screen.h * 0.78; // 850
let rad = Math.PI / 7;
for (let t = 1; t <= 6; t++) {

  const x = radius * Math.cos(rad * t) + (screen.w / 2);
  const y = radius * -Math.sin(rad * t) + screen.h;
  //graphics.drawCircle(x, y, 10);

  let bunny = new PIXI.Sprite(texture);
  bunny.anchor.set(0.5);
  bunny.x = x;
  bunny.y = y;
  gui.add(bunny, 'x', 0, 1920, x);
  gui.add(bunny, 'y', 0, 1080, y);
  app.stage.addChild(bunny);
}

graphics.endFill();
app.stage.addChild(graphics);

// Tell the `renderer` to `render` the `stage`
//app.render(stage);
