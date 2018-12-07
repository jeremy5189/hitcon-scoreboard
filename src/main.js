// Import PIXI
import * as PIXI from 'pixi';

import constant from './constant';
import config from './config';
import logo from './logo';
import stars from './stars';
import redteam from './redteam';
import blueteam from './blueteam';
import polling from './polling';

console.log('config.api', config.api);

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : constant.color.background_black // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Render background star
app.stage.addChild(stars);

// Import logo
app.stage.addChild(logo);

// Render red team
app.stage.addChild(redteam);

// Render blue team
Object.values(blueteam).forEach((team) => {
  app.stage.addChild(team.sprite);
  app.stage.addChild(team.score);
});

polling.fetchData(app, blueteam);

// Polling
setInterval(function() {
  polling.fetchData(app, blueteam);
}, config.fetch_interval);
