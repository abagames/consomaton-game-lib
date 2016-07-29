import * as con from './console';
import * as aut from './automaton';
import * as debug from './debug';
import * as url from './url';
import * as sss from 'sss';
import * as pag from 'pag';

export let gameTicks = 0;
export let isInGame = false;
const updateIntervalBase = 12;
let stateTicks = 0;
let updateTicks = 0;
let isAutomatonBegun = false;
let wasPadPressed = false;
let padUnpressedTicks = 0;
let score = 0;
let title;
let isBgmEnabled = true;

export function init(data) {
  stateTicks = 9999;
  title = data.title != null ? data.title : '';
  if (data.bgm != null && !data.bgm) {
    isBgmEnabled = false;
  }
  let seed = 0;
  if (data.seed != null) {
    seed = data.seed;
    pag.setSeed(seed);
    sss.init(seed);
  } else {
    sss.init();
  }
  if (data.dev) {
    debug.initSeedUi(seed, s => {
      pag.setSeed(s);
      con.createLetterImages();
      sss.reset();
      sss.setSeed(s);
      if (isInGame && isBgmEnabled) {
        sss.playBgm();
      }
      url.saveModified({ seed: s });
    });
    debug.enableShowingErrors();
  }
}

export function update() {
  sss.update();
  updateTicks--;
  if (updateTicks <= 0) {
    con.clear();
    if (isAutomatonBegun) {
      aut.update();
      if (!wasPadPressed && isPadPressed()) {
        wasPadPressed = true;
      }
      if (!wasPadPressed && padUnpressedTicks > 120) {
        if (padUnpressedTicks % 240 > 120) {
          con.print('arrow key or', 0, 0);
        } else {
          con.print('slide to control', 0, 0);
        }
      } else {
        con.print(`SCORE ${score}`, 0, 0);
      }
    }
    if (!isInGame) {
      if (stateTicks < 180) {
        con.print('GAME OVER', 3, 7);
      } else {
        let x = Math.floor(8 - title.length / 2);
        if (x < 0) {
          x = 0;
        }
        con.print(title, x, 6);
        con.print('press key/tap', 1, 9);
        con.print('to start', 3, 10);
      }
    }
    con.update();
    updateTicks = Math.floor(isInGame ?
      updateIntervalBase / (Math.sqrt(stateTicks / 1000 + 1)) :
      updateIntervalBase * 1.7);
    gameTicks++;
  }
  if (!isInGame && stateTicks > 60 && isAnyKeyPressed()) {
    begin();
  }
  stateTicks++;
  if (!wasPadPressed && isAutomatonBegun) {
    padUnpressedTicks++;
  }
}

function isAnyKeyPressed() {
  return con.isTouching || _.some(con.isKeyDown);
}

function isPadPressed() {
  return _.some(aut.isPadPressed);
}

export function addScore(v: number) {
  score += v;
}

function begin() {
  isInGame = isAutomatonBegun = true;
  stateTicks = 0;
  updateTicks = updateIntervalBase;
  score = 0;
  aut.initConsole();
  if (isBgmEnabled) {
    sss.playBgm();
  }
}

export function end() {
  isInGame = false;
  stateTicks = 0;
  sss.stopBgm();
}
