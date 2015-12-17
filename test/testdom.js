module.exports = function(markup) {
  var jsdom = require('jsdom');

  /* JEST JSDOM */
  global.Error.stackTraceLimit = 100;
  global.ArrayBuffer = ArrayBuffer;
  global.Float32Array = Float32Array;
  global.Int16Array = Int16Array;
  global.Int32Array = Int32Array;
  global.Int8Array = Int8Array;
  global.Uint8Array = Uint8Array;
  global.Uint16Array = Uint16Array;
  global.Uint32Array = Uint32Array;
  global.DataView = DataView;
  global.Buffer = Buffer;
  global.process = process;
  global.setImmediate = setImmediate;
  global.clearImmediate = clearImmediate;
  if (!global.hasOwnProperty('mockSetReadOnlyProperty')) {
    global.mockSetReadOnlyProperty = function(obj, property, value) {
      obj.__defineGetter__(property, function() {
        return value;
      });
    };
  }
  try {
    new global.Image();
  } catch (e) {
    global.Image = function Image() {};
  }
  /* DONE JEST JSDOM */

  //var createNodesFromMarkup = require('react/lib/createNodesFromMarkup');
  //createNodesFromMarkup(global.document);
  //console.dir(createNodesFromMarkup);
  //var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
  var canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  var canUseEventListeners = canUseDOM && !!(window.addEventListener || window.attachEvent);
  var canUseViewport = canUseDOM && !!window.screen;
  var isInWorker =  !canUseDOM;

  //ExecutionEnvironment.canUseDOM = canUseDOM;
  //ExecutionEnvironment.canUseEventListeners = canUseEventListeners;
  //ExecutionEnvironment.canUseViewport = canUseViewport;
  //ExecutionEnvironment.isInWorker = isInWorker;
};
