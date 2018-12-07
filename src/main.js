// Import PIXI
import * as PIXI from 'pixi';
import axios from 'axios';
import constant from './constant';
import config from './config';
console.log('config.api', config.api);

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : constant.color.background_black // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

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
  app.stage.addChild(team.sprite);
  app.stage.addChild(team.score);
});

import explode from './explode';

let serverData = {};

function fetchData() {
  clearPhaserInterval();
  axios.get(config.api).then((resp) => {
    console.log('Fetched new data from server');
    serverData = resp.data;
    updateScore();
    executeNormalAttack();
    explodeIfNotAlive();
  });
}

function explodeIfNotAlive() {
  Object.keys(serverData).forEach((team) => {
    let team_id = parseInt(team.replace('T', '')) - 1;
    if (!serverData[team].alive && blueteam[team_id].alive) {
      console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Dead`);
      explode(app, blueteam, team_id);
      blueteam[team_id].alive = false;
      app.stage.removeChild(blueteam[team_id].sprite);
    }
    else {
      if (!blueteam[team_id].alive) {
        console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Alive`);
        app.stage.addChild(blueteam[team_id].sprite);
        blueteam[team_id].alive = true;
      }
    }
  });
}

function updateScore() {
  Object.keys(serverData).forEach((team) => {
    let team_id = parseInt(team.replace('T', '')) - 1;
    blueteam[team_id].score.text = serverData[team].score;
    console.log(`updateScore: ${team} -> ${team_id} -> ${serverData[team].score}`);
  });
}

function executeNormalAttack() {
  Object.keys(serverData).forEach((team) => {
    let team_id = parseInt(team.replace('T', '')) - 1;
    if (serverData[team].under_attack && serverData[team].alive) {
      console.log(`executeNormalAttack: ${team} -> ${team_id}`);
      loopPhaser(team_id);
    }
  });
}

import phaser from './phaser';
const phaserIntervalHandle = [
  null, null, null,
  null, null, null
];

function loopPhaser(team_id) {
  phaserIntervalHandle[team_id] = setInterval(function() {
    phaser(app, blueteam, team_id);
  }, 3000);
}

function clearPhaserInterval() {
  Object.values(phaserIntervalHandle).forEach((handle) => {
    clearInterval(handle);
  });
}

fetchData();

let updateHandle = setInterval(function() {
  fetchData();
}, config.fetch_interval);
