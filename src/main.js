// Import PIXI
import * as PIXI from 'pixi';
import constant from './constant';

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : 0x000 // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Import debug controller
import * as dat from 'dat.gui';
const gui = new dat.GUI();

// Render background star
//import stars from './stars';
//app.stage.addChild(stars);

// Render red team
import redteam from './redteam';
app.stage.addChild(redteam);

import blueteam from './blueteam';
Object.values(blueteam).forEach((team) => {
  app.stage.addChild(team.sprite)
});

import phaser from './phaser';
phaser(app, blueteam, 0);

