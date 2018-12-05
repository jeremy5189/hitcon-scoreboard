import * as PIXI from 'pixi';
import constant from './constant';

const dist_map = {
  0: 610,
  1: 530,
  2: 450,
  3: 450,
  4: 530,
  5: 610,
};

function liner_eq(slop, x, b) {
  return slop * x + b;
}

function distance_to_cannon(x, y) {
  return Math.sqrt(
    (y - constant.red_team_position.cannon.y) * (y - constant.red_team_position.cannon.y) +
    (x - constant.red_team_position.cannon.x) * (x - constant.red_team_position.cannon.x)
  );
}

function phaser(app, blue_team, team_id) {

  const graphicsPhaser = new PIXI.Graphics();
  const graphicsPhaserCenter = new PIXI.Graphics();
  const graphicsCanonLight = new PIXI.Graphics();
  const graphicsCanonLightCenter = new PIXI.Graphics();

  const graphicsPhaserBlur = new PIXI.filters.BlurFilter();
  const graphicsPhaserCenterBlur = new PIXI.filters.BlurFilter();
  const graphicsCanonLightBlur = new PIXI.filters.BlurFilter();
  const graphicsCanonLightCenterBlur = new PIXI.filters.BlurFilter();

  graphicsPhaserBlur.blur = 4;
  graphicsPhaser.filters = [graphicsPhaserBlur];
  graphicsPhaserCenterBlur.blur = 2;
  graphicsPhaserCenterBlur.filters = [graphicsPhaserCenterBlur];

  let slop, b, x = constant.red_team_position.cannon.x;

  slop = (blue_team[team_id].y - constant.red_team_position.cannon.y) /
    (blue_team[team_id].x - constant.red_team_position.cannon.x);

  b = blue_team[team_id].y - slop * blue_team[team_id].x;

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

  const graphicsSheild = new PIXI.Graphics();
  const graphicsSheildCenter = new PIXI.Graphics();

  app.stage.addChild(graphicsSheild);
  app.stage.addChild(graphicsSheildCenter);

  app.stage.addChild(graphicsPhaser);
  app.stage.addChild(graphicsPhaserCenter);
  app.stage.addChild(graphicsCanonLightCenter);
  app.stage.addChild(graphicsCanonLight);

  const rnd = Math.floor(Math.random() * 3);
  const sound = PIXI.sound.Sound.from(`assets/sound/phaser${rnd}.wav`);
  sound.play();

  const blue_team_original = {
    x: blue_team[team_id].sprite.x,
    y: blue_team[team_id].sprite.y
  };

  let back_off_x = 0;
  function blue_team_backoff() {

    back_off_x += 0.5;
    if (team_id > 2) {
      blue_team[team_id].sprite.x -= back_off_x;
      blue_team[team_id].sprite.y = liner_eq(slop, blue_team[team_id].sprite.x, b);
    }
    else {
      blue_team[team_id].sprite.x += back_off_x;
      blue_team[team_id].sprite.y = liner_eq(slop, blue_team[team_id].sprite.x, b);
    }

    if (back_off_x >= 1) {
      app.ticker.remove(blue_team_backoff);
    }
  }

  function blue_team_reposition() {
    back_off_x -= 0.1;
    if (team_id > 2) {
      blue_team[team_id].sprite.x += back_off_x;
      blue_team[team_id].sprite.y = liner_eq(slop, blue_team[team_id].sprite.x, b);
    }
    else {
      blue_team[team_id].sprite.x -= back_off_x;
      blue_team[team_id].sprite.y = liner_eq(slop, blue_team[team_id].sprite.x, b);
    }

    if (back_off_x < 0) {
      app.ticker.remove(blue_team_reposition);
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
    graphicsSheild.beginFill(0x46F975, 1);
    graphicsSheild.drawEllipse(pharser_final.x, pharser_final.y, 30, 20);
    graphicsSheild.endFill();

    graphicsSheildCenterBlur.blur = 5;
    graphicsSheildCenter.filters = [graphicsSheildCenterBlur];
    graphicsSheildCenter.lineStyle(0);
    graphicsSheildCenter.beginFill(0x46F975, 1);
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

    if ( dist >= dist_map[team_id]) {
      pharser_final.x = x;
      pharser_final.y = y;
      sheild();
      app.ticker.remove(shoot);
      //app.ticker.add(blue_team_backoff);
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
    blue_team[team_id].sprite.x = blue_team_original.x;
    blue_team[team_id].sprite.y = blue_team_original.y;
    graphicsPhaser.clear();
    graphicsPhaserCenter.clear();
    graphicsCanonLight.clear();
    graphicsCanonLightCenter.clear();
    graphicsSheild.clear();
    graphicsSheildCenter.clear();
    //app.ticker.add(blue_team_reposition);
  }, 2000);
}

export default phaser;