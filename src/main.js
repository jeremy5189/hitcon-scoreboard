// Import PIXI
import * as PIXI from 'pixi';
import constant from './constant';
import stars from './stars';

// Import debug controller
//import * as dat from 'dat.gui';
//const gui = new dat.GUI();

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : 0x000 // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

app.stage.addChild(stars);

// Drawer of 2D Graphic
const graphics = new PIXI.Graphics();

// Draw red ball in bottom
graphics.lineStyle(0);
graphics.beginFill(0xFF5330, 1);
graphics.drawCircle(constant.red_team_position.center.x, constant.red_team_position.center.y, 100);
graphics.endFill();
app.stage.addChild(graphics);

const blue_team_position = [];
var enterprise_texture = PIXI.Texture.fromImage('assets/texture/enterprise.png');

for (let t = 1; t <= 6; t++) {

  const rad = Math.PI / 7; // angle
  const radius = constant.screen.h * 0.78; // 850
  const x = radius * Math.cos(rad * t) + (constant.screen.w / 2);
  const y = radius * -Math.sin(rad * t) + constant.screen.h;
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
  enterprise.rotation = (t < 4 ? -1 : 1) * 0.05;

  app.stage.addChild(enterprise);
  console.log(blue_team_position);
}

function pharser_eq(slop, x, b)
{
  return slop * x + b;
}

const team_id = 3;
const graphicsPhaser = new PIXI.Graphics();
const graphicsPhaser2 = new PIXI.Graphics();

var blurPhaser = new PIXI.filters.BlurFilter();
blurPhaser.blur = 3;
graphicsPhaser.filters = [blurPhaser];
blurPhaser.blur = 5;
graphicsPhaser.filters = [blurPhaser];

var slop, b, x = constant.red_team_position.cannon.x;

slop = (blue_team_position[team_id].y - constant.red_team_position.cannon.y) /
              ( blue_team_position[team_id].x- constant.red_team_position.cannon.x);

b = blue_team_position[team_id].y - slop * blue_team_position[team_id].x;

app.stage.addChild(graphicsPhaser);
app.stage.addChild(graphicsPhaser2);

function shoot() {

  x -= 20;
  const y = pharser_eq(slop, x, b);

  if ( y < blue_team_position[team_id].y + 110) {
    app.ticker.remove(shoot);
  }

  graphicsPhaser.lineStyle(12, 0xF4D03F);
  graphicsPhaser.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
  graphicsPhaser.lineTo(x, y);

  graphicsPhaser2.lineStyle(6, 0xFFF2A3);
  graphicsPhaser2.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
  graphicsPhaser2.lineTo(x, y);
}

app.ticker.add(shoot);

