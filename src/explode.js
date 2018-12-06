import * as PIXI from 'pixi';

let loader = new PIXI.loaders.Loader();
loader.add('spritesheet', 'assets/texture/mc.json');

let loaded = false;

function explode(app, blueteam, team_id) {

    if (!loaded) {
        loader.once('complete', onAssetsLoaded);
        loader.load();
        loaded = true;
    }
    else {
        onAssetsLoaded();
    }

    function onAssetsLoaded() {

        // create an array to store the textures
        var explosionTextures = [], i;

        for (i = 0; i < 26; i++) {
            var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
            explosionTextures.push(texture);
        }

        var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);

        explosion.x = blueteam[team_id].x;
        explosion.y = blueteam[team_id].y;
        explosion.anchor.set(0.5);
        explosion.rotation = Math.random() * Math.PI;
        explosion.scale.set(2);
        explosion.animationSpeed = 0.2;
        explosion.gotoAndPlay(Math.random() * 27);
        app.stage.addChild(explosion);

        setTimeout(function() {
            app.stage.removeChild(explosion);
        }, 1000);
    }
}

export default explode;