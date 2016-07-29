import * as _ from 'lodash';
import * as fontData from './font_data';
import * as pag from 'pag';
import * as sss from 'sss';
declare const require: any;
const LZstring = require('lz-string');

export const width = 16;
export const height = 17;
export let texts: string[][];
export let isLetters: boolean[][];
export let isKeyDown = _.times(256, () => false);
export let lastPressedKey = null;
export let isTouching = false;
export let touchPadWay: number = null;

const cellPixelSize = 10;
const canvasWidth = width * cellPixelSize;
const canvasHeight = height * cellPixelSize;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let letterImages: HTMLImageElement[];
let pixelArtImages: HTMLImageElement[];
let pixelArt;
let pixelArtOptions;
let touchStartPos = { x: 0, y: 0 };

export function init(data) {
  canvas = <HTMLCanvasElement>document.getElementById('mainCanvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context = canvas.getContext('2d');
  texts = _.times(width, () => _.times(height, () => null));
  isLetters = _.times(width, () => _.times(height, () => false));
  pixelArt = data.pixel_art;
  pixelArtOptions = data.pixel_art_options != null ? data.pixel_art_options : {};
  createLetterImages();
  document.onkeydown = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      e.preventDefault();
    }
    isKeyDown[e.keyCode] = true;
    lastPressedKey = e.keyCode;
  }
  document.onkeyup = e => {
    isKeyDown[e.keyCode] = false;
  }
  document.onmousemove = (e) => {
    onMouseTouchMove(e.pageX, e.pageY);
  };
  document.onmousedown = (e) => {
    onMouseTouchDown(e.pageX, e.pageY);
  };
  document.onmouseup = (e) => {
    onMouseTouchUp(e);
  };
  document.ontouchmove = (e) => {
    e.preventDefault();
    onMouseTouchMove(e.touches[0].pageX, e.touches[0].pageY);
  }
  document.ontouchstart = (e) => {
    onMouseTouchDown(e.touches[0].pageX, e.touches[0].pageY);
    sss.playEmpty();
  }
  document.ontouchend = (e) => {
    onMouseTouchUp(e);
  }
}

function onMouseTouchMove(x, y) {
  if (!isTouching) {
    return;
  }
  const tx = x - canvas.offsetLeft - touchStartPos.x;
  const ty = y - canvas.offsetTop - touchStartPos.y;
  const a = Math.atan2(ty, tx);
  const d = Math.sqrt(tx * tx + ty * ty);
  if (d > 10) {
    touchPadWay = a / (Math.PI / 4);
  } else {
    touchPadWay = null;
  }
}

function onMouseTouchDown(x, y) {
  touchStartPos.x = x - canvas.offsetLeft;
  touchStartPos.y = y - canvas.offsetTop;
  isTouching = true;
  touchPadWay = null;
}

function onMouseTouchUp(e) {
  isTouching = false;
  touchPadWay = null;
}

export function update() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  _.times(width, x => _.times(height, y => {
    drawChar(x, y);
  }));
}

export function clear() {
  _.times(width, x => _.times(height, y => {
    texts[x][y] = null;
    isLetters[x][y] = false;
  }));
}

export function print(str: string, sx: number, sy: number) {
  let x = sx;
  _.forEach(str, c => {
    if (x >= width) {
      return false;
    }
    texts[x][sy] = c;
    isLetters[x][sy] = true;
    x++;
  });
}

function drawChar(x, y) {
  const c = texts[x][y];
  if (c != null && c !== ' ') {
    const cc = c.charCodeAt(0) - 32;
    const img = isLetters[x][y] ? letterImages[cc] : pixelArtImages[cc];
    context.drawImage(img, x * cellPixelSize, y * cellPixelSize);
  }
}

export function createLetterImages() {
  const imageDataUrls =
    JSON.parse(LZstring.decompressFromEncodedURIComponent(fontData.fontData));
  letterImages = [];
  pixelArtImages = [];
  _.forEach(imageDataUrls, (du, ci: number) => {
    const img = new Image();
    img.src = du;
    letterImages.push(img);
    let isGenerated = false;
    let genCvs;
    _.forOwn(pixelArt, (v, k) => {
      let ri;
      if ((ri = k.indexOf(String.fromCharCode(ci + 32))) >= 0) {
        if (!_.isArray(v)) {
          v = [v];
        }
        let pattern = v.length > 0 ? v[0].split('\n') : [];
        pattern.pop();
        pattern.shift();
        let options = _.cloneDeep(pixelArtOptions);
        options = _.merge(options, v[1]);
        options.rotationNum = k.length;
        pixelArtImages.push(generatePixelArt(pattern, options, ri, k.length > 1));
        isGenerated = true;
        return false;
      }
    });
    if (!isGenerated) {
      pixelArtImages.push(img);
    }
  });
}

function generatePixelArt(pattern, options, ri, isRotated) {
  const img = new Image();
  const cvs = document.createElement('canvas');
  cvs.width = cvs.height = cellPixelSize;
  const ctx = cvs.getContext('2d');
  const id = ctx.getImageData(0, 0, cvs.width, cvs.height);
  const pixels = pag.generate(pattern, options)[ri];
  const w = pixels.length;
  const h = pixels[0].length;
  const o = isRotated ? 3 : 0;
  let i = 0;
  _.times(cvs.height, y => {
    _.times(cvs.width, x => {
      if (x + o < w && y + o < h) {
        id.data[i] = pixels[x + o][y + o].r * 255;
        id.data[i + 1] = pixels[x + o][y + o].g * 255;
        id.data[i + 2] = pixels[x + o][y + o].b * 255;
        id.data[i + 3] = 255;
      }
      i += 4;
    });
  });
  ctx.putImageData(id, 0, 0);
  img.src = cvs.toDataURL('image/png');
  return img;
}
