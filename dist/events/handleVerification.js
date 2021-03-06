'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleVerification;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleVerification(_ref) {
  var _this = this;

  var user = _ref.user,
      address = _ref.address;

  return new _bluebird2.default(function (resolve, reject) {
    if (!user || !user.profile || !user.profile.username) {
      resolve({ code: 200, data: { authentication: false, user: user } });
    } else {
      var username = user.profile.username;

      _this.getSavedContract({
        dirPath: _this.dirPath,
        contractFile: _this.contractFile
      }).then(function () {
        return _this.gittokenContract.getContributorAddress(username);
      }).then(function (contributorAddress) {
        console.log('handleVerification::contributorAddress', contributorAddress);
        if (address == contributorAddress) {
          resolve({
            code: 200,
            data: {
              authentication: true,
              user: user,
              address: address
            }
          });
        } else {
          return _this.verifyContributor({
            username: username,
            contributorAddress: address
          });
        }
      }).then(function (txReceipt) {
        return _this.gittokenContract.getContributorAddress(username);
      }).then(function (_contributorAddress) {
        if (_contributorAddress == address) {
          resolve({
            code: 200,
            data: {
              authentication: true,
              user: user,
              address: address
            }
          });
        } else {
          var error = new Error('Could not verify user with the contract! Transaction Failed');
          throw error;
        }
      }).catch(function (error) {
        console.log('handleVerification::error', error);
        reject(error);
      });
    }
  });
}