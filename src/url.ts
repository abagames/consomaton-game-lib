declare const require: any;
const LZString = require('lz-string');

const version = '1';
let data: any;

export function save(_data) {
  data = _data;
  const baseUrl = window.location.href.split('?')[0];
  const encDataStr = LZString.compressToEncodedURIComponent(JSON.stringify(_data));
  const url = `${baseUrl}?v=${version}&d=${encDataStr}`;
  try {
    window.history.replaceState({}, '', url);
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function saveModified(modifiedData) {
  save(_.merge(data, modifiedData));
}

export function load() {
  const query = window.location.search.substring(1);
  if (query == null) {
    return false;
  }
  let params = query.split('&');
  let _version: string;
  let encDataStr: string;
  _.forEach(params, (param) => {
    const pair = param.split('=');
    if (pair[0] === 'v') {
      _version = pair[1];
    }
    if (pair[0] === 'd') {
      encDataStr = pair[1];
    }
  });
  if (_version !== version || encDataStr == null) {
    return false;
  }
  try {
    return JSON.parse(LZString.decompressFromEncodedURIComponent(encDataStr));
  } catch (e) {
    console.log(e);
    return false;
  }
}
