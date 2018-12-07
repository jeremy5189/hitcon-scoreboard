import axios from 'axios';
import phaser from './phaser';
import explode from './explode';
import config from './config';

const phaserControl = {

  // Save set interval handle
  phaserIntervalHandle: [
    null, null, null, null, null, null
  ],

  // Init phaser attack with setInterval
  loopPhaser(app, blueteam, team_id) {
    phaserControl.phaserIntervalHandle[team_id] = setInterval(function() {
      phaser(app, blueteam, team_id);
    }, 3000);
  },

  // Stop all phaser attack
  clearPhaserInterval() {
    Object.values(phaserControl.phaserIntervalHandle).forEach((handle) => {
      clearInterval(handle);
    });
  }
};

const explosionControl = {
  explode_wrap(app, blueteam, team_id) {
    explode(app, blueteam, team_id);
    blueteam[team_id].alive = false;
    blueteam[team_id].sprite.alpha = 0;
    let alphaHandle = setInterval(function() {
      blueteam[team_id].sprite.alpha += 0.01;
      if (blueteam[team_id].sprite.alpha >= 0.2) {
        clearInterval(alphaHandle);
      }
    }, 500);
  },
  explodeIfNotAlive(app, blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = parseInt(team.replace('T', '')) - 1;
      if (!polling.serverData[team].alive && blueteam[team_id].alive) {
        console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Dead`);
        // Under phaser attack now, die later
        if (blueteam[team_id].under_phaser) {
          setTimeout(function() {
            explosionControl.explode_wrap(app, blueteam, team_id);
          }, 2000);
        }
        else {
          // die now
          explosionControl.explode_wrap(app, blueteam, team_id);
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
}

const polling = {

  // Local copy of api data
  serverData: {},

  // Main fetcher
  fetchData(app, blueteam) {

    // Make sure do not phaser is shooting
    phaserControl.clearPhaserInterval();

    // Fetch API
    axios.get(config.api).then((resp) => {
      console.log('Fetched new data from server');
      polling.serverData = resp.data;
      polling.updateScore(blueteam);
      polling.executeNormalAttack(app, blueteam); // Start phaser loop
      explosionControl.explodeIfNotAlive(app, blueteam);
    });
  },

  // Update text on each blue team ship
  updateScore(blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = parseInt(team.replace('T', '')) - 1;
      blueteam[team_id].score.text = polling.serverData[team].score;
      console.log(`updateScore: ${team} -> ${team_id} -> ${polling.serverData[team].score}`);
    });
  },

  // Init phaser attack
  executeNormalAttack(app, blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = parseInt(team.replace('T', '')) - 1;
      // Only start phaser if target is alive and under attack
      if (polling.serverData[team].under_attack && polling.serverData[team].alive) {
        console.log(`executeNormalAttack: ${team} -> ${team_id}`);
        phaserControl.loopPhaser(app, blueteam, team_id);
      }
    });
  }
};

export default polling;