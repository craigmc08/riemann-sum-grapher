import Complex from 'complex-js';
import zeta from './Zeta';

let stop = false;
let sum = Complex(0, 0);

const run = (callback, last, n, input) => () => {
  if (!stop) {
    const newSum = incrementSum(last, n, input);
    console.log(newSum);
    callback(newSum);
    setTimeout(run(callback, newSum, ++n, input), 100);
  }
};

function startWork(callback) {
  run(callback)();
}
function stopWork() {
  stop = true;
}

function incrementSum(sum, n, input) {
  const res = zeta(n, input);
  return sum['+'](res);
}

export { startWork, stopWork, incrementSum };
