// Import PIXI
import * as PIXI from 'pixi';
import constant from './constant';

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : constant.color.background_black // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Import debug controller
import * as dat from 'dat.gui';
const gui = new dat.GUI();

// Import ogo
import logo from './logo';
app.stage.addChild(logo);

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

import score from './score';
Object.keys(score).forEach((index) => {
  score[index].x = blueteam[index].x;
  score[index].y = blueteam[index].y - 150;
  app.stage.addChild(score[index]);
  score[index].text = index;
});

import phaser from './phaser';
setTimeout(() => {
  phaser(app, blueteam, 0);
  setTimeout(() => {
    phaser(app, blueteam, 1);
    setTimeout(() => {
      phaser(app, blueteam, 2);
      setTimeout(() => {
        phaser(app, blueteam, 3);
        setTimeout(() => {
          phaser(app, blueteam, 4);
          setTimeout(() => {
            phaser(app, blueteam, 5);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  }, 3000);
}, 1000);
