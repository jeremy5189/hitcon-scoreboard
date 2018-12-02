import * as PIXI from 'pixi'

// Screen size
const screen = {
  w: 1920,
  h: 1080
};

// Create the renderer
const renderer = PIXI.autoDetectRenderer(screen.w, screen.h);

// Add the canvas to the HTML document
document.body.appendChild(renderer.view);

// Create a container object called the `stage`
const stage = new PIXI.Container();

var graphics = new PIXI.Graphics();

// Draw red team
graphics.lineStyle(0);
graphics.beginFill(0xFF5330, 1);
graphics.drawCircle(screen.w / 2, screen.h, 100);

// Draw blue team
graphics.beginFill(0x5D94FF, 1);
let radius = screen.h * 0.78; // 850
let rad = Math.PI / 7;
for (let t = 1; t <= 6; t++) {
  const x = radius * Math.cos(rad * t);
  const y = radius * -Math.sin(rad * t);
  graphics.drawCircle(x + (screen.w / 2), y + (screen.h), 50);
}
graphics.endFill();
stage.addChild(graphics);

// Tell the `renderer` to `render` the `stage`
renderer.render(stage);
