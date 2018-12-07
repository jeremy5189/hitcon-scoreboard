import * as PIXI from 'pixi';
import constant from './constant';
import sound from './sound';

// net_flow from 1 ~ 100
function beam(app, blueteam, team_id, net_flow) {

  let beam_width = net_flow / 10;

  if (beam_width <= 0) {
    return;
  }

  // mark under attack
  blueteam[team_id].under_beam = true;

  // Make liner equation from red team to blueteam
  let slop = (blueteam[team_id].y - constant.red_team_position.cannon.y) /
    (blueteam[team_id].x - constant.red_team_position.cannon.x);

  // Make vertical line which pass through blue team
  slop = -1 / slop;

  //let b = blueteam[team_id].y - slop * blueteam[team_id].x;
  sound.beam().play();

  const beams = [];
  for ( let i = -beam_width; i <= beam_width; i += 1 ) {

    const dx = 5 * i / Math.sqrt(1 + slop*slop);
    const x = blueteam[team_id].x + dx;
    const y = blueteam[team_id].y + slop * dx;
    const line = new PIXI.Graphics();
    const lineBlur = new PIXI.filters.BlurFilter();

    lineBlur.blur = 1;
    line.filters = [lineBlur];
    line.fillAlpha = 0.6;
    line.lineStyle(0.5, Math.abs(i) % 2 === 0 ? constant.color.beam_green : constant.color.beam_green_dark);
    line.moveTo(constant.red_team_position.cannon.x, constant.red_team_position.cannon.y);
    line.lineTo(x, y);
    app.stage.addChild(line);

    beams.push({
      x,
      y,
      line
    });
  }

  setTimeout(function() {
    Object.values(beams).forEach((obj) => {
      obj.line.clear();
      app.stage.removeChild(obj.line);
      obj.line.destroy();
    });
  }, 2000);
}

export default beam;