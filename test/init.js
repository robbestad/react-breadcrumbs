module.exports = function (markup) {
  if("undefined" === typeof global.document){
    var jsdom = require("jsdom");
    global.document = jsdom.jsdom('<!doctype html><html><body></body>body></html>html>');
    global.window = global.document.parentWindow;
    global.navigator = {
        online: true,
        process: process,
        userAgent: 'node.js'
      };
    }
};
