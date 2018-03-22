import Complex from 'complex-js';

function zeta(n, s) {
  if (n instanceof Complex || s instanceof Complex) {
    const cn = n instanceof Complex ? n : new Complex(n, 0);
    const cs = s instanceof Complex ? s : new Complex(s, 0);
    return Complex(1, 0)['/'](cn.pow(cs));
  } else {
    return 1 / n**s;
  }
}

export default zeta;
