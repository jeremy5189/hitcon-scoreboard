import * as PIXI from 'pixi';
import sound from './sound';

let loader = new PIXI.loaders.Loader();
loader.add('spritesheet', 'assets/texture/mc.json');

function explode(app, blueteam, team_id) {

  loader.once('complete', onAssetsLoaded);
  loader.load();

  function onAssetsLoaded() {

    // create an array to store the textures
    let explosionTextures = [], i;

    for (i = 0; i < 26; i++) {
      let texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
      explosionTextures.push(texture);
    }

    sound.explode().play();
    let explosion = new PIXI.extras.AnimatedSprite(explosionTextures);

    explosion.x = blueteam[team_id].x;
    explosion.y = blueteam[team_id].y;
    explosion.anchor.set(0.5);
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(2.5);
    explosion.animationSpeed = 0.2;
    explosion.gotoAndPlay(2);
    app.stage.addChild(explosion);

    setTimeout(function() {
      app.stage.removeChild(explosion);
      explosion.destroy();
    }, 1500);
  }
}

export default explode;