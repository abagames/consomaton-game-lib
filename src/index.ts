import * as game from './game';
import * as con from './console';
import * as aut from './automaton';
import * as url from './url';

let isInitialized = false;

window.onload = () => {
  if (isInitialized) {
    return;
  }
  const data = url.load();
  if (data !== false) {
    if (data.title != null) {
      document.title = `${data.title} - CONSOMATON GAME LIB`;
    }
    initWithData(data);
    update();
  }
};

export function init(data: any = {}) {
  initWithData(data);
  url.save(data);
  update();
}

function initWithData(data: any) {
  game.init(data);
  con.init(data);
  aut.init(data);
  isInitialized = true;
}

function update() {
  requestAnimationFrame(update);
  game.update();
}
