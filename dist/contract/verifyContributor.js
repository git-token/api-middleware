'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyContributor;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyContributor(_ref) {
  var _this = this;

  var contributorAddress = _ref.contributorAddress,
      username = _ref.username;

  return new _bluebird2.default(function (resolve, reject) {
    var decimals = _this.config.decimals;

    var from = '0x' + _this.ks.getAddresses()[0];
    // console.log('from', from)
    _this.getSavedContract({
      dirPath: _this.dirPath,
      contractFile: _this.contractFile
    }).then(function (contractDetails) {
      // console.log('generateReward::contractDetails', contractDetails)
      console.log('verifyContributor::username, contributorAddress', username, contributorAddress);
      return _this.gittokenContract.verifyContributor.getData(contributorAddress, username);
    }).then(function (data) {
      return _this.signTransaction({
        to: _this.gittokenContract.address,
        from: from,
        value: 0,
        gasPrice: 1e9,
        gasLimit: 5e5,
        data: data
      });
    }).then(function (signedTx) {
      return _this.eth.sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      // console.log('txReceipt', txReceipt)
      resolve(txReceipt);
    }).catch(function (error) {
      reject(error);
    });
  });
}