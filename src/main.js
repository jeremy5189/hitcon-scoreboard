// Import PIXI
import * as PIXI from 'pixi';

import constant from './constant';
import config from './config';
import logo from './logo';
import stars from './stars';
import redteam from './redteam';
import blueteam from './blueteam';
import polling from './polling';
import vtime from './vtime';

console.log('config.api', config.api);

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : constant.color.background_black,
  forceCanvas: true
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Render background star
app.stage.addChild(stars);

// Import logo
app.stage.addChild(logo);

// Render vtime
app.stage.addChild(vtime.hour);
app.stage.addChild(vtime.day);

// Render red team
app.stage.addChild(redteam);

// Render blue team
Object.values(blueteam).forEach((team) => {
  app.stage.addChild(team.sprite);
  app.stage.addChild(team.score);
  app.stage.addChild(team.name);
});

polling.fetchData(app, blueteam);
polling.fetchVTime(vtime);
//polling.startMinTick(vtime);

// Polling
setInterval(function() {
  polling.fetchData(app, blueteam);
}, config.fetch_interval);

setInterval(function() {
  polling.fetchVTime(vtime);
}, config.fetch_vtime_interval);

