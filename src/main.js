// Import PIXI
import * as PIXI from 'pixi';
import axios from 'axios';

import constant from './constant';
import config from './config';
import logo from './logo';
import stars from './stars';
import redteam from './redteam';
import blueteam from './blueteam';
import explode from './explode';
import phaser from './phaser';

console.log('config.api', config.api);

// Create the renderer
var app = new PIXI.Application(constant.screen.w, constant.screen.h, {
  backgroundColor : constant.color.background_black // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Import logo
app.stage.addChild(logo);

// Render background star
app.stage.addChild(stars);

// Render red team
app.stage.addChild(redteam);

Object.values(blueteam).forEach((team) => {
  app.stage.addChild(team.sprite);
  app.stage.addChild(team.score);
});

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

function explode_wrap(team_id) {
  explode(app, blueteam, team_id);
  blueteam[team_id].alive = false;
  blueteam[team_id].sprite.alpha = 0;
  let alphaHandle = setInterval(function() {
    blueteam[team_id].sprite.alpha += 0.01;
    if (blueteam[team_id].sprite.alpha >= 0.2) {
      clearInterval(alphaHandle);
    }
  }, 500);
}

function explodeIfNotAlive() {
  Object.keys(serverData).forEach((team) => {
    let team_id = parseInt(team.replace('T', '')) - 1;
    if (!serverData[team].alive && blueteam[team_id].alive) {
      console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Dead`);
      // Under phaser attack now, die later
      if (blueteam[team_id].under_phaser) {
        setTimeout(function() {
          explode_wrap(team_id);
        }, 2000);
      }
      else {
        // die now
        explode_wrap(team_id);
      }
    }
    else {
      if (!blueteam[team_id].alive) {
        console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Alive`);
        let alphaHandle = setInterval(function() {
          blueteam[team_id].sprite.alpha += 0.05;
          if (blueteam[team_id].sprite.alpha >= 1) {
            clearInterval(alphaHandle);
          }
        }, 100);
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

// Polling
setInterval(function() {
  fetchData();
}, config.fetch_interval);
