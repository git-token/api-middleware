'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = logVote;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logVote(_ref) {
  var connection = _ref.connection,
      event = _ref.event,
      data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    console.log('Log Vote Event to log, link to prior nodes');

    connection.send((0, _stringify2.default)({
      event: event,
      received: true,
      node: {}
    }));
    resolve(true);
  });
}