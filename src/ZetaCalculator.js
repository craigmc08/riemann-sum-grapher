import Complex from 'complex-js';
import zeta from './Zeta';
import { startWork, stopWork, incrementSum } from './ZetaWorker';

const lines = [];

export default function(draw, input, graph, iters=50) {
  lines.map((line) => {
    line.remove();
    return line;
  }).filter(l => false);

  let lastSum = new Complex(0, 0);

  let i = 1
  for (; i <= iters; i++) {
    const calc = zeta(i, input);
    const sx = graph.GXToWX(lastSum.real);
    const sy = graph.GYToWY(lastSum.imag);
    lastSum = lastSum.add(calc);
    const ex = graph.GXToWX(lastSum.real);
    const ey = graph.GYToWY(lastSum.imag);

    const line = draw.line(sx, sy, ex, ey).stroke({ width: 5, color: i % 2 ? '#f06' : '#f60' });
    lines.push(line);
  }

  console.log(lastSum);
  lastSum = incrementSum(lastSum, ++i, input);
  console.log(lastSum);
  // console.log(lastSum);
  // startWork(newSum => {
  //   const sx = graph.GXToWX(lastSum.real);
  //   const sy = graph.GXToWX(lastSum.imag);
  //   const ex = graph.GXToWX(newSum.real);
  //   const ey = graph.GYToWY(newSum.imag);
  //
  //   const line = draw.line(sx, sy, ex, ey).stroke({ width: 10, color: ++i % 2 ? '#f06' : '#f60' });
  //   lines.push(line);
  //
  //   lastSum = newSum;
  // }, lastSum, i, input);
}
