import * as PIXI from 'pixi';

const style = new PIXI.TextStyle({
  fontFamily: 'Microsoft JhengHei',
  fontSize: 36,
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
  //wordWrap: true,
  //wordWrapWidth: 200
});

const names = [];
for (let i = 5; i >= 0; i-- ) {
  let text = new PIXI.Text('-', style);;
  text.anchor.set(0.5, 0.5);
  names[i] = text;
}

export default names;