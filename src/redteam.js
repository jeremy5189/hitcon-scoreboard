import * as PIXI from 'pixi';
import constant from './constant';

let borg_cube_texture = PIXI.Texture.fromImage('assets/texture/borg-cube.png');
let borg_cube = new PIXI.Sprite(borg_cube_texture);

borg_cube.x = constant.red_team_position.center.x;
borg_cube.y = constant.red_team_position.center.y;
borg_cube.anchor.set(0.5);

export default borg_cube;
