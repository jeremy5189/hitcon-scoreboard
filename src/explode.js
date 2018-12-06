import * as PIXI from 'pixi';

function explode(app) {

    var loader = new PIXI.loaders.Loader();
    loader.add('spritesheet', 'assets/texture/mc.json');
    loader.once('complete', onAssetsLoaded);
    loader.load();

    function onAssetsLoaded() {

        // create an array to store the textures
        var explosionTextures = [],
            i;

        for (i = 0; i < 26; i++) {
            var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
            explosionTextures.push(texture);
        }

        for (i = 0; i < 1; i++) {
            // create an explosion AnimatedSprite
            var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);

            explosion.x = Math.random() * app.screen.width;
            explosion.y = Math.random() * app.screen.height;
            explosion.anchor.set(0.5);
            explosion.rotation = Math.random() * Math.PI;
            explosion.scale.set(0.75 + Math.random() * 0.5);
            explosion.gotoAndPlay(Math.random() * 27);
            app.stage.addChild(explosion);
        }

        // start animating
        app.start();
    }
}

export default explode;