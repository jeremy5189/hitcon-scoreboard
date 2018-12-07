import * as PIXI from 'pixi';
import constant from './constant';
import sound from './sound';

// Phaser will stop at this distance
const dist_map = {
  0: 610,
  1: 530,
  2: 450,
  3: 450,
  4: 530,
  5: 610,
};

// liner equation y = mx + b
function liner_eq(slop, x, b) {
  return slop * x + b;
}

// distance formula
function distance_to_cannon(x, y) {
  return Math.sqrt(
    (y - constant.red_team_position.cannon.y) * (y - constant.red_team_position.cannon.y) +
    (x - constant.red_team_position.cannon.x) * (x - constant.red_team_position.cannon.x)
  );
}

// Exported function
function phaser(app, blueteam, team_id) {

  // mark under attack
  blueteam[team_id].under_phaser = true;

  const graphicsPhaser = new PIXI.Graphics();
  const graphicsPhaserCenter = new PIXI.Graphics();
  const graphicsCanonLight = new PIXI.Graphics();
  const graphicsCanonLightCenter = new PIXI.Graphics();

  const graphicsPhaserBlur = new PIXI.filters.BlurFilter();
  const graphicsPhaserCenterBlur = new PIXI.filters.BlurFilter();
  const graphicsCanonLightBlur = new PIXI.filters.BlurFilter();
  const graphicsCanonLightCenterBlur = new PIXI.filters.BlurFilter();

  // Blur more around the light beam
  graphicsPhaserBlur.blur = 4;
  graphicsPhaser.filters = [graphicsPhaserBlur];

  // Blur less in the center of the light beam to make it look more solid
  graphicsPhaserCenterBlur.blur = 2;
  graphicsPhaserCenterBlur.filters = [graphicsPhaserCenterBlur];

  // Make liner equation
  let slop, b, x = constant.red_team_position.cannon.x;

  slop = (blueteam[team_id].y - constant.red_team_position.cannon.y) /
    (blueteam[team_id].x - constant.red_team_position.cannon.x);

  b = blueteam[team_id].y - slop * blueteam[team_id].x;

  // Draw cannon light
  graphicsCanonLightBlur.blur = 10;
  graphicsCanonLight.filters = [graphicsCanonLightBlur];
  graphicsCanonLight.lineStyle(0);
  graphicsCanonLight.beginFill(constant.color.cannon_light_red, 0.5);
  graphicsCanonLight.drawCircle(
    constant.red_team_position.cannon.x,
    constant.red_team_position.cannon.y,
    15
  );
  graphicsCanonLight.endFill();

  // Draw cannon light in center, less blur to make it solid
  graphicsCanonLightCenterBlur.blur = 7;
  graphicsCanonLightCenter.filters = [graphicsCanonLightCenterBlur];
  graphicsCanonLightCenter.lineStyle(0);
  graphicsCanonLightCenter.beginFill(constant.color.phaser_center_yellow, 0.8);
  graphicsCanonLightCenter.drawCircle(
    constant.red_team_position.cannon.x,
    constant.red_team_position.cannon.y,
    8
  );
  graphicsCanonLightCenter.endFill();

  // Draw sheild
  const graphicsSheild = new PIXI.Graphics();
  const graphicsSheildCenter = new PIXI.Graphics();

  // Before phaser (layer under)
  app.stage.addChild(graphicsSheild);
  app.stage.addChild(graphicsSheildCenter);

  // Draw phaser and cannon light
  app.stage.addChild(graphicsPhaser);
  app.stage.addChild(graphicsPhaserCenter);
  app.stage.addChild(graphicsCanonLightCenter);
  app.stage.addChild(graphicsCanonLight);

  // Play a random sound
  sound.phaser().play();

  let blueteam_tilt_offset = 0.05;

  function blueteam_tilt() {

    blueteam_tilt_offset += 0.01;
    blueteam[team_id].sprite.rotation = (team_id < 3 ? -1 : 1) * blueteam_tilt_offset;

    if (blueteam_tilt_offset >= 0.1) {
      app.ticker.remove(blueteam_tilt);
    }
  }

  function blueteam_reposition() {

    blueteam_tilt_offset -= 0.01;
    blueteam[team_id].sprite.rotation = (team_id < 3 ? -1 : 1) * blueteam_tilt_offset;

    if (blueteam_tilt_offset < 0.05) {
      app.ticker.remove(blueteam_reposition);
    }
  }

  const pharser_final = {
    x: 0,
    y: 0
  };

  function sheild() {

    const graphicsSheildBlur = new PIXI.filters.BlurFilter();
    const graphicsSheildCenterBlur = new PIXI.filters.BlurFilter();

    graphicsSheildBlur.blur = 15;
    graphicsSheild.filters = [graphicsSheildBlur];
    graphicsSheild.lineStyle(0);
    graphicsSheild.beginFill(constant.color.sheild_blue, 1);
    graphicsSheild.drawEllipse(pharser_final.x, pharser_final.y, 30, 20);
    graphicsSheild.endFill();

    graphicsSheildCenterBlur.blur = 5;
    graphicsSheildCenter.filters = [graphicsSheildCenterBlur];
    graphicsSheildCenter.lineStyle(0);
    graphicsSheildCenter.beginFill(constant.color.sheild_blue, 1);
    graphicsSheildCenter.drawEllipse(pharser_final.x, pharser_final.y, 10, 10);
    graphicsSheildCenter.endFill();
  }

  function shoot() {

    if (team_id > 2) {
      x -= 40;
    }
    else {
      x += 40;
    }

    const y = liner_eq(slop, x, b);
    const dist = distance_to_cannon(x, y);

    // When phaser hit stop pisition
    if ( dist >= dist_map[team_id]) {
      pharser_final.x = x;
      pharser_final.y = y;
      app.ticker.remove(shoot);

      sheild();
      app.ticker.add(blueteam_tilt);
    }

    graphicsPhaser.clear();
    graphicsPhaser.lineStyle(12, constant.color.phaser_glow_yellow);
    graphicsPhaser.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
    graphicsPhaser.lineTo(x, y);

    graphicsPhaserCenter.clear();
    graphicsPhaserCenter.lineStyle(6, constant.color.phaser_center_yellow);
    graphicsPhaserCenter.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
    graphicsPhaserCenter.lineTo(x, y);
  }

  app.ticker.add(shoot);

  setTimeout(function() {
    blueteam[team_id].under_phaser = false;
    graphicsPhaser.clear();
    graphicsPhaserCenter.clear();
    graphicsCanonLight.clear();
    graphicsCanonLightCenter.clear();
    graphicsSheild.clear();
    graphicsSheildCenter.clear();
    app.stage.removeChild(graphicsSheild);
    app.stage.removeChild(graphicsSheildCenter);
    app.stage.removeChild(graphicsPhaser);
    app.stage.removeChild(graphicsPhaserCenter);
    app.stage.removeChild(graphicsCanonLightCenter);
    app.stage.removeChild(graphicsCanonLight);
    graphicsPhaser.destroy();
    graphicsPhaserCenter.destroy();
    graphicsCanonLight.destroy();
    graphicsCanonLightCenter.destroy();
    graphicsSheild.destroy();
    graphicsSheildCenter.destroy();
    app.ticker.add(blueteam_reposition);
  }, 2000);
}

export default phaser;