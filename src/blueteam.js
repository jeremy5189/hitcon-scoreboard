import * as PIXI from 'pixi';
import constant from './constant';
import score from './score';

const blue_team = [];
const enterprise_texture = PIXI.Texture.fromImage('assets/texture/enterprise.png');

for (let team = 0; team < 6; team++) {

  const rad = Math.PI / 7; // angle
  const radius = constant.screen.h * 0.78; // 850
  const x = radius * Math.cos(rad * (team + 1)) + (constant.screen.w / 2);
  const y = radius * -Math.sin(rad * (team + 1)) + constant.screen.h;
  const enterprise = new PIXI.Sprite(enterprise_texture);

  enterprise.anchor.set(0.5);
  enterprise.x = x;
  enterprise.y = y;
  enterprise.rotation = (team < 3 ? -1 : 1) * 0.05;

  score[team].x = x;
  score[team].y = y - 150;
  score[team].text = team;

  blue_team.push({
    x,
    y,
    sprite: enterprise,
    score: score[team],
    alive: true,
    under_phaser: false
  });
}

export default blue_team;