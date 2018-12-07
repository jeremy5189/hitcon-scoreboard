import * as PIXI from 'pixi';

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 48,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#4d84f9'], // gradient
    stroke: '#1456e1',
    // strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    // wordWrap: true,
    // wordWrapWidth: 440
});

const scores = [];
for( let i = 5; i >= 0; i-- ) {
    let text = new PIXI.Text('87000', style);;
    text.y = 50;
    text.anchor.set(0.5, 0.5);
    scores[i] = text;
}

export default scores;