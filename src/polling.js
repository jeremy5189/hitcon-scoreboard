import axios from 'axios';
import phaser from './phaser';
import beam from './beam';
import explode from './explode';
import config from './config';
import constant from './constant';

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

const beamControl = {

  // Save set interval handle
  beamIntervalHandle: [
    null, null, null, null, null, null
  ],

  // Init phaser attack with setInterval
  loopBeam(app, blueteam, team_id, net_flow) {
    beamControl.beamIntervalHandle[team_id]= setInterval(function() {
      beam(app, blueteam, team_id, net_flow);
    }, 5000);
  },

  // Stop all phaser attack
  clearBeamInterval() {
    Object.values(beamControl.beamIntervalHandle).forEach((handle) => {
      clearInterval(handle);
    });
  }
};

// blueteam.alive_level = 1
const floatingControl = {
  startFloating(app, blueteam, team_id) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = constant.team_id_mapping[team];
      // Float if currently alive

    });
  }
}

// blueteam.alive_level = 0
const explosionControl = {
  explode_wrap(app, blueteam, team_id) {
    explode(app, blueteam, team_id);
    blueteam[team_id].alive = false; // Prevent from explode again
    blueteam[team_id].sprite.alpha = 0;
    explosionControl.animateAlphaToDead(blueteam[team_id]);
  },

  animateAlphaToDead(blueteam) {
    let alphaHandle = setInterval(function() {
      blueteam.sprite.alpha += 0.01;
      if (blueteam.sprite.alpha >= 0.2) {
        clearInterval(alphaHandle);
      }
    }, 500);
  },

  animateAlphaToAlive(blueteam) {
    let alphaHandle = setInterval(function() {
      blueteam.sprite.alpha += 0.05;
      if (blueteam.sprite.alpha >= 1) {
        clearInterval(alphaHandle);
      }
    }, 100);
  },

  explodeIfNotAlive(app, blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = constant.team_id_mapping[team];
      // Explode if currently alive
      if (polling.serverData[team].alive_level <= 0 &&
            blueteam[team_id].prev_alive_level > 0) {
        console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Dead (Level = 0)`);
        // Under phaser attack now, die later
        if (blueteam[team_id].under_phaser || blueteam[team_id].under_beam) {
          setTimeout(function() {
            explosionControl.explode_wrap(app, blueteam, team_id);
          }, 3000);
        } else {
          // die now
          explosionControl.explode_wrap(app, blueteam, team_id);
        }
      }
      else {
        // Currently dead, should come to live
        if (blueteam[team_id].prev_alive_level <= 0 &&
              polling.serverData[team].alive_level > 0) {
          console.log(`explodeIfNotAlive: ${team} -> ${team_id} -> Alive (Level > 0)`);
          explosionControl.animateAlphaToAlive(blueteam[team_id]);
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
    beamControl.clearBeamInterval();

    // Fetch API
    axios.get(config.api).then((resp) => {
      console.log('Fetched new data from server');
      polling.serverData = resp.data;
      polling.updateAliveLevel(blueteam);
      polling.updateTeamName(blueteam);
      polling.updateScore(blueteam);
      polling.executeAttack(app, blueteam); // Start phaser loop
      explosionControl.explodeIfNotAlive(app, blueteam);
    });
  },

  // Update team name
  updateTeamName(blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = constant.team_id_mapping[team];
      blueteam[team_id].name.text = polling.serverData[team].teamname;
    });
  },

  // Update team name
  // Level:
  //   3: Fully alive
  //   2: Shield Red
  //   1: Floating, change to crappy ship texture
  //   0: Explode, alpha to 0.2
  updateAliveLevel(blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = constant.team_id_mapping[team];
      polling.serverData[team].alive_level =
        polling.serverData[team].alive_web +
        polling.serverData[team].alive_erp +
        polling.serverData[team].alive_sslvpn;
      blueteam[team_id].prev_alive_level = blueteam[team_id].alive_level;
      blueteam[team_id].alive_level = polling.serverData[team].alive_level;
    });
  },

  // Update text on each blue team ship
  updateScore(blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = constant.team_id_mapping[team];
      blueteam[team_id].score.text = polling.serverData[team].score;
      console.log(`updateScore: ${team} -> ${team_id} -> ${polling.serverData[team].score}`);
    });
  },

  // Init phaser attack
  executeAttack(app, blueteam) {
    Object.keys(polling.serverData).forEach((team) => {
      let team_id = constant.team_id_mapping[team];
      // Only start phaser if target is alive and under attack
      if (polling.serverData[team].ddos > 0 && polling.serverData[team].alive_level > 0) {
        console.log(`executeAttack/beam: ${team} -> ${team_id}`);
        beamControl.loopBeam(app, blueteam, team_id, polling.serverData[team].ddos);
      }
      else if (polling.serverData[team].under_attack && polling.serverData[team].alive_level > 0) {
        console.log(`executeAttack/phaser: ${team} -> ${team_id}, alive_level = ${blueteam[team_id].alive_level}`);
        phaserControl.loopPhaser(app, blueteam, team_id);
      }
    });
  }
};

export default polling;