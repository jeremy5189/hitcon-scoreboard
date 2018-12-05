import * as PIXI from 'pixi';
import constant from './constant';

let logo_texture = PIXI.Texture.fromImage('assets/hitcon-reverse.png');
let logo = new PIXI.Sprite(logo_texture);

logo.x = constant.logo.x;
logo.y = constant.logo.y;
logo.anchor.set(0.5);

export default logo;
