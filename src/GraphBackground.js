import SVG from 'svg.js';

export default class GraphBackground {
  constructor(draw, start, end, scale, size) {
    this.draw = draw;
    this.start = start;
    this.end = end;
    this.scale = scale;
    this.size = size;
  }

  render() {
    const lineStroke = {
      width: 3,
      color: 'rgba(50, 50, 50)',
    };
    const centerLineStroke = {
      width: 9,
      color: 'rgba(100, 100, 100)',
    };

    for (let i = 1; i < (this.numberOfLinesX / 2); i++) {
      const gx = 0 + this.scale.x * i;
      const xp = this.GXToWX(gx);
      const xn = this.GXToWX(-gx);
      this.draw.line(xp, 0, xp, this.size.y).stroke(lineStroke);
      this.draw.line(xn, 0, xn, this.size.y).stroke(lineStroke);
    }
    for (let i = 1; i < (this.numberOfLinesY / 2); i++) {
      const gy = 0 + this.scale.y * i;
      const yp = this.GYToWY(gy);
      const yn = this.GYToWY(-gy);
      this.draw.line(0, yp, this.size.x, yp).stroke(lineStroke);
      this.draw.line(0, yn, this.size.x, yn).stroke(lineStroke);
    }

    // for (let i = 0; i < this.numberOfLinesX; i++) {
    //   const x = this.GXToWX(this.start.x + this.scale.x * i);
    //   this.draw.line(x, 0, x, this.size.y).stroke(lineStroke);
    // }
    // for (let i = 0; i < this.numberOfLinesY; i++) {
    //   const y = this.GYToWY(this.start.y + this.scale.y * i);
    //   this.draw.line(0, y, this.size.x, y).stroke(lineStroke);
    // }

    const zeroX = this.GXToWX(0);
    const zeroY = this.GYToWY(0);
    this.draw.line(zeroX, 0, zeroX, this.size.y).stroke(centerLineStroke);
    this.draw.line(0, zeroY, this.size.x, zeroY).stroke(centerLineStroke);
  }

  GXToWX(gx) {
    return (gx - this.start.x) / this.width * this.size.x;
  }
  GYToWY(gy) {
    return (gy - this.start.y) / this.height * this.size.y;
  }
  WXToGX(wx) {
    return wx / this.size.x * this.width + this.start.x;
  }
  WYToGY(wy) {
    return wy / this.size.y * this.height + this.start.y;
  }

  get centerX() {
    return this.start.x + this.width / 2;
  }
  get centerY() {
    return this.start.y + this.height / 2;
  }

  get width() {
    return Math.abs(this.end.x - this.start.x);
  }
  get height() {
    return Math.abs(this.end.y - this.start.y);
  }

  get numberOfLinesX() {
    return Math.ceil(this.width / this.scale.x) + 1;
  }
  get numberOfLinesY() {
    return Math.ceil(this.height / this.scale.y) + 1;
  }
}
