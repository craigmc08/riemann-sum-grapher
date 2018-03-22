import Complex from 'complex-js';
import SVG from 'svg.js';

import GraphBackground from './GraphBackground';
import Zeta from './ZetaCalculator';
import { Vector } from './MathClasses';

const draw = SVG('graph').size('100%', '100%');
const boundingRect = document.querySelector('#graph svg').getBoundingClientRect();
const { width, height } = boundingRect;

const startX = -5;
const endX = 5;
const centerY = 0;

const aspect = width / height;
const widthY = (endX - startX) / aspect;
const startY = centerY - widthY / 2;
const endY = centerY + widthY / 2;

const graph = new GraphBackground(
  draw,
  new Vector(startX, startY),
  new Vector(endX, endY),
  new Vector(1, 1),
  new Vector(width, height),
);
graph.render();

const svgEl = document.querySelector('#graph svg');
let dragging = false;
svgEl.addEventListener('mousedown', (e) => {
  dragging = true;
});
svgEl.addEventListener('mousemove', (e) => {
  if (dragging) {
    updateZeta(e);
  }
})
svgEl.addEventListener('mouseup', (e) => {
  if (dragging) {
    dragging = false;
    updateZeta(e);
  }
});
let drawnZetaPoint = undefined;
function updateZeta(e) {
  const { clientX, clientY } = e;
  const gx = graph.WXToGX(clientX);
  const gy = graph.WYToGY(clientY);
  Zeta(draw, new Complex(gx, gy), graph, 50);

  if (drawnZetaPoint !== undefined) {
    drawnZetaPoint.remove();
  }
  drawnZetaPoint = draw.circle(20);
  drawnZetaPoint.fill({ color: 'white' });
  drawnZetaPoint.x(clientX - 10);
  drawnZetaPoint.y(clientY - 10);
}
