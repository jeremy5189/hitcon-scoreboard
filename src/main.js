// Import PIXI
import * as PIXI from 'pixi';

// Import debug controller
import * as dat from 'dat.gui';
const gui = new dat.GUI();

// Screen size
const screen = {
  w: 1920,
  h: 1080
};

// Create the renderer
var app = new PIXI.Application(screen.w, screen.h, {
  backgroundColor : 0x000 // Black
});

// Add the canvas to the HTML document
document.body.appendChild(app.view);

// Drawer of 2D Graphic
const graphics = new PIXI.Graphics();

// Draw red ball in bottom
graphics.lineStyle(0);
graphics.beginFill(0xFF5330, 1);
graphics.drawCircle(screen.w / 2, screen.h, 100);
graphics.endFill();
app.stage.addChild(graphics);

const blue_team_position = [];
for (let t = 1; t <= 6; t++) {
  const rad = Math.PI / 7; // angle
  const radius = screen.h * 0.78; // 850
  const x = radius * Math.cos(rad * t) + (screen.w / 2);
  const y = radius * -Math.sin(rad * t) + screen.h;
  blue_team_position.push({
    x, y
  });
}
console.log('blue_team_position', blue_team_position)

PIXI.loader
    .add('assets/texture/fighter.json')
    .load((onAssetsLoaded));

function onAssetsLoaded()
{
    // create an array of textures from an image path
    var frames = [];

    for (var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    var anim = new PIXI.extras.AnimatedSprite(frames);

    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();

    app.stage.addChild(anim);

    // Animate the rotation
    app.ticker.add(function() {
        anim.rotation += 0.01;
    });
}
