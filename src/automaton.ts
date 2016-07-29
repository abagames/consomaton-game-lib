import * as _ from 'lodash';
import * as con from './console';
import * as game from './game';
import * as sss from 'sss';

interface Rule {
  before: string[];
  after: string[];
  commands: any[];
  isSettleing?: boolean;
  isLeavingOrgChar?: boolean;
}

export let isPadPressed;
let rules: Rule[];
let rulesDataStr: string;
let cells: string[][];
let nextCells: string[][];
const width = 16;
const height = 16;
const keys = {
  '^': [87, 38, 104],
  '>': [68, 39, 102],
  'v': [83, 40, 98, 101],
  '<': [65, 37, 100]
};
let firstConsole: string;
let isSeEnabled = true;

export function init(data) {
  firstConsole = data.console != null ? _.cloneDeep(data.console) : '';
  initConsole();
  nextCells = _.times(width, () => _.times(height, () => null));
  rules = [];
  let currentRule: Rule = null;
  rulesDataStr = '';
  const dataRules = data.rules != null ? data.rules : '';
  _.forEach(dataRules.split('\n'), (rl: string) => {
    if (_.startsWith(rl, '///')) {
      return;
    }
    if (_.startsWith(rl, '===') || _.startsWith(rl, '---') || _.startsWith(rl, '...')) {
      if (currentRule != null) {
        normalizeRule(currentRule);
        rules.push(currentRule);
        copyRulesWithCommand(rules, currentRule);
        if (_.startsWith(rl, '===')) {
          rules[rules.length - 1].isSettleing = true;
        }
        if (_.startsWith(rl, '...')) {
          rules[rules.length - 1].isLeavingOrgChar = true;
        }
      }
      const commands = [];
      const regexp = RegExp(`([a-z]|/)([^-/]*)-?`, 'g');
      let matched;
      let i = 0;
      rulesDataStr += rl.substr(0, 3);
      rl = rl.substr(3);
      while ((matched = regexp.exec(rl)) != null) {
        const type = matched[1];
        const args = matched[2] !== '' ? (matched[2].trim()).split(',') : [];
        if (type === '/') {
          break;
        }
        addRulesWithCommand(rules, type, args);
        commands.push({ type, args });
        if (i++ > 16) {
          break;
        }
      }
      currentRule = { before: [], after: [], commands };
      let ci = rl.indexOf('/');
      if (ci >= 0) {
        rl = rl.substr(0, ci);
      }
      rulesDataStr += rl + '\n';
    } else if (currentRule != null && currentRule.before.length < 3) {
      currentRule.before.push(rl.substr(0, 3));
      currentRule.after.push(rl.substr(3, 3));
      rulesDataStr += rl.substr(0, 6) + '\n';
    }
  });
  if (currentRule != null) {
    normalizeRule(currentRule);
    rules.push(currentRule);
    copyRulesWithCommand(rules, currentRule);
  }
  if (data.se != null && !data.se) {
    isSeEnabled = false;
  }
  data.rules = rulesDataStr;
}

export function initConsole() {
  const cls = firstConsole.split('\n');
  cells = _.times(width, x => _.times(height, y => {
    if (y >= cls.length - 1) {
      return null;
    }
    const cl = cls[y + 1];
    if (x >= cl.length) {
      return null;
    }
    return cl[x];
  }));
}

function normalizeRule(rule) {
  _.times(3, i => {
    if (i < rule.before.length) {
      rule.before[i] = (rule.before[i] + '   ').substr(0, 3);
      rule.after[i] = (rule.after[i] + '   ').substr(0, 3);
    } else {
      rule.before.push('   ');
      rule.after.push('   ');
    }
  });
  if (_.every(rule.before, b => b === '   ') && _.every(rule.after, a => a === '   ')) {
    rule.before = rule.after = null;
    return;
  }
}

function addRulesWithCommand(rules, type, args) {
  switch (type) {
    case 'k':
      _.forEach(args[0], c => {
        const r = { before: [c], after: [c] };
        normalizeRule(r);
        rules.push(r);
      });
      break;
  }
}

const rolllOffsets = [
  [0, 2, 0, 1, 0, 0, 1, 2, 1, 1, 1, 0, 2, 2, 2, 1, 2, 0],
  [2, 2, 1, 2, 0, 2, 2, 1, 1, 1, 0, 1, 2, 0, 1, 0, 0, 0],
  [2, 0, 2, 1, 2, 2, 1, 0, 1, 1, 1, 2, 0, 0, 0, 1, 0, 2]
];
function copyRulesWithCommand(rules, rule) {
  _.forEach(rule.commands, c => {
    switch (c.type) {
      case 'd':
        const w = c.args.length < 1 || c.args[0] !== '2' ? 4 : 2;
        const cs = c.args.length < 2 ? null : c.args[1];
        const ps = c.args.length < 3 ? null : c.args[2];
        let psi = 1;
        for (let i = 0; i < 3; i++) {
          if (i !== 1 && w === 2) {
            continue;
          }
          const r = {
            before: [],
            after: [],
            commands: _.cloneDeep(rule.commands)
          };
          if (ps != null) {
            r.commands.push({ type: 'p', args: [ps[psi]] });
          }
          const ro = rolllOffsets[i];
          let j = 0;
          for (let y = 0; y < 3; y++) {
            let bstr = '';
            let astr = '';
            for (let x = 0; x < 3; x++) {
              let b = rule.before[ro[j + 1]][ro[j]];
              let csi;
              if (cs != null && (csi = cs.indexOf(b)) >= 0) {
                b = cs[(csi + psi) % w];
              }
              let a = rule.after[ro[j + 1]][ro[j]];
              if (cs != null && (csi = cs.indexOf(a)) >= 0) {
                a = cs[(csi + psi) % w];
              }
              bstr += b;
              astr += a;
              j += 2;
            }
            r.before.push(bstr);
            r.after.push(astr);
          }
          psi++;
          rules.push(r);
        }
        if (ps != null) {
          rule.commands.push({ type: 'p', args: [ps[0]] });
        }
        break;
    }
  });
}

export function update() {
  checkPadPressed();
  clearNextCells();
  _.forEach(rules, rule => {
    matchRule(rule);
  });
  copyCurrentToNext();
  swapCurrentAndNext();
  drawToConsole();
}

export function checkPadPressed() {
  isPadPressed = _.mapValues(keys, () => false);
  _.forOwn(keys, (v, k) => {
    if (_.some(v, (k: number) => con.isKeyDown[k] || k == con.lastPressedKey)) {
      isPadPressed[k] = true;
      con.lastPressedKey = null;
    }
  });
  if (con.touchPadWay != null) {
    const touchPadWay = con.touchPadWay;
    if (touchPadWay < -0.5 && touchPadWay > -3.5) {
      isPadPressed['^'] = true;
    }
    if (touchPadWay > 0.5 && touchPadWay < 3.5) {
      isPadPressed['v'] = true;
    }
    if (touchPadWay > -1.5 && touchPadWay < 1.5) {
      isPadPressed['>'] = true;
    }
    if (touchPadWay < -2.5 || touchPadWay > 2.5) {
      isPadPressed['<'] = true;
    }
  }
}

function clearNextCells() {
  _.times(width, x => _.times(height, y => nextCells[x][y] = null));
}

function matchRule(rule: Rule) {
  const isCondMatched = testCond(rule.commands);
  if (rule.before == null && isCondMatched) {
    fireEvent(rule.commands);
    return;
  }
  const isLeavingMatchedCell = _.some(rule.commands, (c: any) => c.type === 'l');
  for (let x = -2; x < width; x++) {
    for (let y = -2; y < height; y++) {
      if (isCondMatched &&
        testBefore(x, y, rule) &&
        testCondEachCell(rule.commands, x, y, rule)) {
        fireEvent(rule.commands);
        setAfter(x, y, rule, rule.isLeavingOrgChar);
      }
    }
  }
  if (rule.isSettleing) {
    copyCurrentToNext();
    swapCurrentAndNext();
    clearNextCells();
  }
}

function testBefore(sx, sy, rule) {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const rc = rule.before[y][x];
      if (rc !== ' ' && rc !== getCell(sx + x, sy + y)) {
        return false;
      }
    }
  }
  return true;
}

function testCond(commands) {
  let isCondMatched = true;
  _.forEach(commands, c => {
    switch (c.type) {
      case 'p':
        if (!isPadPressed[c.args[0]]) {
          isCondMatched = false;
          return false;
        }
        break;
      case 'i':
        const i = Number(c.args[0]);
        if (game.gameTicks % i > 0) {
          isCondMatched = false;
          return false;
        }
        break;
      case 'e':
        if (!exists(c.args[0])) {
          isCondMatched = false;
          return false;
        }
        break;
      case 'n':
        if (exists(c.args[0])) {
          isCondMatched = false;
          return false;
        }
        break;
    }
  });
  return isCondMatched;
}

function testCondEachCell(commands, sx, sy, rule) {
  let isCondMatched = true;
  _.forEach(commands, c => {
    switch (c.type) {
      case 'r':
        const a = Number(c.args[0]);
        if (Math.random() > 1 / a) {
          isCondMatched = false;
          return false;
        }
        break;
      case 'c':
        let count = 0;
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            const rc = rule.before[y][x];
            const cl = getCell(sx + x, sy + y);
            if (rc === ' ' && cl != null && _.indexOf(c.args[1], cl) >= 0) {
              count++;
            }
          }
        }
        if (count !== Number(c.args[0])) {
          isCondMatched = false;
          return false;
        }
        break;
    }
  });
  return isCondMatched;
}

function fireEvent(events) {
  if (!game.isInGame) {
    return;
  }
  _.forEach(events, e => {
    switch (e.type) {
      case 's':
        game.addScore(e.args.length >= 1 ? Number(e.args[0]) : 1);
        break;
      case 'o':
        game.end();
        break;
      case 'f':
        if (isSeEnabled) {
          sss.play(e.args[0], (e.args.length >= 2 ? Number(e.args[1]) : 2));
        }
        break;
    }
  });
}

function setAfter(sx, sy, rule, isLeavingMatchedCell) {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const bc = rule.before[y][x];
      const ac = rule.after[y][x];
      const nc = getNextCell(sx + x, sy + y);
      if ((bc !== ' ' || ac !== ' ') && (nc == null || nc === ' ')) {
        setNextCell(sx + x, sy + y, ac);
      }
      if (!isLeavingMatchedCell && bc !== ' ') {
        setCell(sx + x, sy + y, null);
      }
    }
  }
}

function copyCurrentToNext() {
  _.times(width, x => {
    _.times(height, y => {
      if (nextCells[x][y] == null && cells[x][y] != null) {
        nextCells[x][y] = cells[x][y];
      }
    });
  });
}

function swapCurrentAndNext() {
  const tc = cells;
  cells = nextCells;
  nextCells = tc;
}

function drawToConsole() {
  _.times(width, x => _.times(height, y => con.texts[x][y + 1] = cells[x][y]));
}

function getCell(x, y) {
  return x >= 0 && x < width && y >= 0 && y < height ? cells[x][y] : null;
}

function setCell(x, y, v) {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    cells[x][y] = v;
  }
}

function getNextCell(x, y) {
  return x >= 0 && x < width && y >= 0 && y < height ? nextCells[x][y] : null;
}

function setNextCell(x, y, v) {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    nextCells[x][y] = v;
  }
}

export function exists(cs: string) {
  let exists = false;
  _.times(width, x => _.times(height, y => {
    if (cs.indexOf(cells[x][y]) >= 0) {
      exists = true;
      return false;
    }
  }));
  return exists;
}
