/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/pump@3.0.2";
exports.ids = ["vendor-chunks/pump@3.0.2"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/pump@3.0.2/node_modules/pump/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/.pnpm/pump@3.0.2/node_modules/pump/index.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var once = __webpack_require__(/*! once */ \"(ssr)/./node_modules/.pnpm/once@1.4.0/node_modules/once/once.js\")\nvar eos = __webpack_require__(/*! end-of-stream */ \"(ssr)/./node_modules/.pnpm/end-of-stream@1.4.4/node_modules/end-of-stream/index.js\")\nvar fs\n\ntry {\n  fs = __webpack_require__(/*! fs */ \"fs\") // we only need fs to get the ReadStream and WriteStream prototypes\n} catch (e) {}\n\nvar noop = function () {}\nvar ancient = /^v?\\.0/.test(process.version)\n\nvar isFn = function (fn) {\n  return typeof fn === 'function'\n}\n\nvar isFS = function (stream) {\n  if (!ancient) return false // newer node version do not need to care about fs is a special way\n  if (!fs) return false // browser\n  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)\n}\n\nvar isRequest = function (stream) {\n  return stream.setHeader && isFn(stream.abort)\n}\n\nvar destroyer = function (stream, reading, writing, callback) {\n  callback = once(callback)\n\n  var closed = false\n  stream.on('close', function () {\n    closed = true\n  })\n\n  eos(stream, {readable: reading, writable: writing}, function (err) {\n    if (err) return callback(err)\n    closed = true\n    callback()\n  })\n\n  var destroyed = false\n  return function (err) {\n    if (closed) return\n    if (destroyed) return\n    destroyed = true\n\n    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks\n    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want\n\n    if (isFn(stream.destroy)) return stream.destroy()\n\n    callback(err || new Error('stream was destroyed'))\n  }\n}\n\nvar call = function (fn) {\n  fn()\n}\n\nvar pipe = function (from, to) {\n  return from.pipe(to)\n}\n\nvar pump = function () {\n  var streams = Array.prototype.slice.call(arguments)\n  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop\n\n  if (Array.isArray(streams[0])) streams = streams[0]\n  if (streams.length < 2) throw new Error('pump requires two streams per minimum')\n\n  var error\n  var destroys = streams.map(function (stream, i) {\n    var reading = i < streams.length - 1\n    var writing = i > 0\n    return destroyer(stream, reading, writing, function (err) {\n      if (!error) error = err\n      if (err) destroys.forEach(call)\n      if (reading) return\n      destroys.forEach(call)\n      callback(error)\n    })\n  })\n\n  return streams.reduce(pipe)\n}\n\nmodule.exports = pump\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vcHVtcEAzLjAuMi9ub2RlX21vZHVsZXMvcHVtcC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSxXQUFXLG1CQUFPLENBQUMsNkVBQU07QUFDekIsVUFBVSxtQkFBTyxDQUFDLHlHQUFlO0FBQ2pDOztBQUVBO0FBQ0EsT0FBTyxtQkFBTyxDQUFDLGNBQUk7QUFDbkIsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXJ0M21pc29yYWNsZS8uL25vZGVfbW9kdWxlcy8ucG5wbS9wdW1wQDMuMC4yL25vZGVfbW9kdWxlcy9wdW1wL2luZGV4LmpzPzlkMTUiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG9uY2UgPSByZXF1aXJlKCdvbmNlJylcbnZhciBlb3MgPSByZXF1aXJlKCdlbmQtb2Ytc3RyZWFtJylcbnZhciBmc1xuXG50cnkge1xuICBmcyA9IHJlcXVpcmUoJ2ZzJykgLy8gd2Ugb25seSBuZWVkIGZzIHRvIGdldCB0aGUgUmVhZFN0cmVhbSBhbmQgV3JpdGVTdHJlYW0gcHJvdG90eXBlc1xufSBjYXRjaCAoZSkge31cblxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxudmFyIGFuY2llbnQgPSAvXnY/XFwuMC8udGVzdChwcm9jZXNzLnZlcnNpb24pXG5cbnZhciBpc0ZuID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbidcbn1cblxudmFyIGlzRlMgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIGlmICghYW5jaWVudCkgcmV0dXJuIGZhbHNlIC8vIG5ld2VyIG5vZGUgdmVyc2lvbiBkbyBub3QgbmVlZCB0byBjYXJlIGFib3V0IGZzIGlzIGEgc3BlY2lhbCB3YXlcbiAgaWYgKCFmcykgcmV0dXJuIGZhbHNlIC8vIGJyb3dzZXJcbiAgcmV0dXJuIChzdHJlYW0gaW5zdGFuY2VvZiAoZnMuUmVhZFN0cmVhbSB8fCBub29wKSB8fCBzdHJlYW0gaW5zdGFuY2VvZiAoZnMuV3JpdGVTdHJlYW0gfHwgbm9vcCkpICYmIGlzRm4oc3RyZWFtLmNsb3NlKVxufVxuXG52YXIgaXNSZXF1ZXN0ID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtLnNldEhlYWRlciAmJiBpc0ZuKHN0cmVhbS5hYm9ydClcbn1cblxudmFyIGRlc3Ryb3llciA9IGZ1bmN0aW9uIChzdHJlYW0sIHJlYWRpbmcsIHdyaXRpbmcsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrID0gb25jZShjYWxsYmFjaylcblxuICB2YXIgY2xvc2VkID0gZmFsc2VcbiAgc3RyZWFtLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBjbG9zZWQgPSB0cnVlXG4gIH0pXG5cbiAgZW9zKHN0cmVhbSwge3JlYWRhYmxlOiByZWFkaW5nLCB3cml0YWJsZTogd3JpdGluZ30sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGNsb3NlZCA9IHRydWVcbiAgICBjYWxsYmFjaygpXG4gIH0pXG5cbiAgdmFyIGRlc3Ryb3llZCA9IGZhbHNlXG4gIHJldHVybiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKGNsb3NlZCkgcmV0dXJuXG4gICAgaWYgKGRlc3Ryb3llZCkgcmV0dXJuXG4gICAgZGVzdHJveWVkID0gdHJ1ZVxuXG4gICAgaWYgKGlzRlMoc3RyZWFtKSkgcmV0dXJuIHN0cmVhbS5jbG9zZShub29wKSAvLyB1c2UgY2xvc2UgZm9yIGZzIHN0cmVhbXMgdG8gYXZvaWQgZmQgbGVha3NcbiAgICBpZiAoaXNSZXF1ZXN0KHN0cmVhbSkpIHJldHVybiBzdHJlYW0uYWJvcnQoKSAvLyByZXF1ZXN0LmRlc3Ryb3kganVzdCBkbyAuZW5kIC0gLmFib3J0IGlzIHdoYXQgd2Ugd2FudFxuXG4gICAgaWYgKGlzRm4oc3RyZWFtLmRlc3Ryb3kpKSByZXR1cm4gc3RyZWFtLmRlc3Ryb3koKVxuXG4gICAgY2FsbGJhY2soZXJyIHx8IG5ldyBFcnJvcignc3RyZWFtIHdhcyBkZXN0cm95ZWQnKSlcbiAgfVxufVxuXG52YXIgY2FsbCA9IGZ1bmN0aW9uIChmbikge1xuICBmbigpXG59XG5cbnZhciBwaXBlID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gIHJldHVybiBmcm9tLnBpcGUodG8pXG59XG5cbnZhciBwdW1wID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RyZWFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgdmFyIGNhbGxiYWNrID0gaXNGbihzdHJlYW1zW3N0cmVhbXMubGVuZ3RoIC0gMV0gfHwgbm9vcCkgJiYgc3RyZWFtcy5wb3AoKSB8fCBub29wXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RyZWFtc1swXSkpIHN0cmVhbXMgPSBzdHJlYW1zWzBdXG4gIGlmIChzdHJlYW1zLmxlbmd0aCA8IDIpIHRocm93IG5ldyBFcnJvcigncHVtcCByZXF1aXJlcyB0d28gc3RyZWFtcyBwZXIgbWluaW11bScpXG5cbiAgdmFyIGVycm9yXG4gIHZhciBkZXN0cm95cyA9IHN0cmVhbXMubWFwKGZ1bmN0aW9uIChzdHJlYW0sIGkpIHtcbiAgICB2YXIgcmVhZGluZyA9IGkgPCBzdHJlYW1zLmxlbmd0aCAtIDFcbiAgICB2YXIgd3JpdGluZyA9IGkgPiAwXG4gICAgcmV0dXJuIGRlc3Ryb3llcihzdHJlYW0sIHJlYWRpbmcsIHdyaXRpbmcsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmICghZXJyb3IpIGVycm9yID0gZXJyXG4gICAgICBpZiAoZXJyKSBkZXN0cm95cy5mb3JFYWNoKGNhbGwpXG4gICAgICBpZiAocmVhZGluZykgcmV0dXJuXG4gICAgICBkZXN0cm95cy5mb3JFYWNoKGNhbGwpXG4gICAgICBjYWxsYmFjayhlcnJvcilcbiAgICB9KVxuICB9KVxuXG4gIHJldHVybiBzdHJlYW1zLnJlZHVjZShwaXBlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHB1bXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/pump@3.0.2/node_modules/pump/index.js\n");

/***/ })

};
;