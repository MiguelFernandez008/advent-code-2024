let canvas;
let context;
let gameID;
let delta = 0;
let currentTime = 0;
let lasTime = 0;
let FPS = 400;
let interval = 1000 / FPS;
function noop() {}

function gameLoop({ updateCallback }) {
  const defaults = {
    updateCallback:
      typeof updateCallback === "function" ? updateCallback : noop,
  };
  gameID = requestAnimationFrame(function () {
    gameLoop({ updateCallback });
  });
  currentTime = new Date().getTime();
  delta = currentTime - lasTime;
  if (delta > interval) {
    defaults?.updateCallback(delta, context, canvas, gameID);
    lasTime = currentTime - (delta % interval);
  }
}

function init({ container, initCallback }) {
  const defaults = {
    container: container ?? "playground",
    initCallback: initCallback ?? noop,
  };
  (async function () {
    canvas = document.getElementById(defaults.container);
    context = canvas.getContext("2d");
    defaults.initCallback();
  })();
}

async function* makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder("utf-8");
  let response = await fetch(fileURL);
  let reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk, { stream: true }) : "";

  let re = /\r\n|\n|\r/gm;
  let startIndex = 0;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      let remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk =
        remainder + (chunk ? utf8Decoder.decode(chunk, { stream: true }) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < chunk.length) {
    // last line didn't end in a newline char
    yield chunk.substr(startIndex);
  }
}

export { init, gameLoop, makeTextFileLineIterator, noop };
