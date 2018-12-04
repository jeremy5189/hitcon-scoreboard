import * as PIXI from 'pixi';
import constant from './constant';

function liner_eq(slop, x, b) {
  return slop * x + b;
}

function phaser(app, blue_team, team_id) {
  const graphicsPhaser = new PIXI.Graphics();
  const graphicsPhaserCenter = new PIXI.Graphics();
  const blurPhaser = new PIXI.filters.BlurFilter();

  blurPhaser.blur = 4;
  graphicsPhaser.filters = [blurPhaser];
  blurPhaser.blur = 2;
  graphicsPhaserCenter.filters = [blurPhaser];

  let slop, b, x = constant.red_team_position.cannon.x;

  slop = (blue_team[team_id].y - constant.red_team_position.cannon.y) /
    (blue_team[team_id].x - constant.red_team_position.cannon.x);

  b = blue_team[team_id].y - slop * blue_team[team_id].x;

  console.log('slop', slop, 'b', b);

  app.stage.addChild(graphicsPhaser);
  app.stage.addChild(graphicsPhaserCenter);

  const sound = PIXI.sound.Sound.from('assets/sound/phaser.wav');
  sound.play();

  function shoot() {

    if (team_id > 2)
      x -= 40;
    else
      x += 40;

    const y = liner_eq(slop, x, b);

    if ( y <= blue_team[team_id].y ) {
      app.ticker.remove(shoot);
    }

    graphicsPhaser.clear();
    graphicsPhaser.lineStyle(12, 0xF4D03F);
    graphicsPhaser.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
    graphicsPhaser.lineTo(x, y);

    graphicsPhaserCenter.clear();
    graphicsPhaserCenter.lineStyle(6, 0xFFF2A3);
    graphicsPhaserCenter.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
    graphicsPhaserCenter.lineTo(x, y);
  }

  app.ticker.add(shoot);

  setTimeout(function() {
    graphicsPhaser.clear();
    graphicsPhaserCenter.clear();
  }, 2000);
}

export default phaser;