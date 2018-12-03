// Import PIXI
import * as PIXI from 'pixi';

// Import debug controller
import * as dat from 'dat.gui';
const gui = new dat.GUI();

// Screen size
const screen = {
  w: 1920,
  h: 1080
};

// Create the renderer
var app = new PIXI.Application(screen.w, screen.h, {
  backgroundColor : 0x000 // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Drawer of 2D Graphic
const graphics = new PIXI.Graphics();

// Draw red ball in bottom
graphics.lineStyle(0);
graphics.beginFill(0xFF5330, 1);
graphics.drawCircle(screen.w / 2, screen.h, 100);
graphics.endFill();
app.stage.addChild(graphics);

const blue_team_position = [];
var enterprise_texture = PIXI.Texture.fromImage('assets/texture/enterprise.png');

for (let t = 1; t <= 7; t++) {

  // Empty
  if (t === 4)
    continue;

  const rad = Math.PI / 8; // angle
  const radius = screen.h * 0.78; // 850
  const x = radius * Math.cos(rad * t) + (screen.w / 2);
  const y = radius * -Math.sin(rad * t) + screen.h;
  blue_team_position.push({
    x, y
  });

  let enterprise = new PIXI.Sprite(enterprise_texture, {
    width: 300,
    height: 300
  });

  enterprise.anchor.set(0.5);
  enterprise.x = x;
  enterprise.y = y;

  app.stage.addChild(enterprise);
}

