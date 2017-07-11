'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github');

var _KeystoreGenerator2 = require('./KeystoreGenerator');

var _KeystoreGenerator3 = _interopRequireDefault(_KeystoreGenerator2);

var _index = require('./smtp/index');

var _index2 = require('./websocket/index');

var _index3 = require('./utils/index');

var _index4 = require('./hyperlog/index');

var _index5 = require('./events/index');

var _index6 = require('./contract/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenContract = '{\n  "contract_name": "GitToken",\n  "abi": [\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_rewardType",\n          "type": "string"\n        }\n      ],\n      "name": "getRewardDetails",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_spender",\n          "type": "address"\n        },\n        {\n          "name": "_value",\n          "type": "uint256"\n        }\n      ],\n      "name": "approve",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "totalSupply",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        }\n      ],\n      "name": "getContributorAddress",\n      "outputs": [\n        {\n          "name": "",\n          "type": "address"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_from",\n          "type": "address"\n        },\n        {\n          "name": "_to",\n          "type": "address"\n        },\n        {\n          "name": "_value",\n          "type": "uint256"\n        }\n      ],\n      "name": "transferFrom",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "organization",\n      "outputs": [\n        {\n          "name": "",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "decimals",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_rewardType",\n          "type": "string"\n        },\n        {\n          "name": "_rewardBonus",\n          "type": "uint256"\n        }\n      ],\n      "name": "rewardContributor",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_rewardValue",\n          "type": "uint256"\n        },\n        {\n          "name": "_rewardType",\n          "type": "string"\n        }\n      ],\n      "name": "setRewardValue",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "",\n          "type": "address"\n        }\n      ],\n      "name": "owner",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_contributor",\n          "type": "address"\n        }\n      ],\n      "name": "balanceOf",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        }\n      ],\n      "name": "getUnclaimedRewards",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "symbol",\n      "outputs": [\n        {\n          "name": "",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_to",\n          "type": "address"\n        },\n        {\n          "name": "_value",\n          "type": "uint256"\n        }\n      ],\n      "name": "transfer",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "getOrganization",\n      "outputs": [\n        {\n          "name": "",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_code",\n          "type": "bytes"\n        }\n      ],\n      "name": "setContributor",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_contributor",\n          "type": "address"\n        },\n        {\n          "name": "_email",\n          "type": "string"\n        }\n      ],\n      "name": "verifyContributor",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_owner",\n          "type": "address"\n        },\n        {\n          "name": "_spender",\n          "type": "address"\n        }\n      ],\n      "name": "allowance",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "newOwner",\n          "type": "address"\n        }\n      ],\n      "name": "transferOwnership",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "inputs": [\n        {\n          "name": "_contributor",\n          "type": "address"\n        },\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_organization",\n          "type": "string"\n        },\n        {\n          "name": "_symbol",\n          "type": "string"\n        },\n        {\n          "name": "_decimals",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "constructor"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "owner",\n          "type": "address"\n        },\n        {\n          "indexed": true,\n          "name": "spender",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "value",\n          "type": "uint256"\n        }\n      ],\n      "name": "Approval",\n      "type": "event"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "from",\n          "type": "address"\n        },\n        {\n          "indexed": true,\n          "name": "to",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "value",\n          "type": "uint256"\n        }\n      ],\n      "name": "Transfer",\n      "type": "event"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "contributor",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "value",\n          "type": "uint256"\n        },\n        {\n          "indexed": false,\n          "name": "date",\n          "type": "uint256"\n        },\n        {\n          "indexed": false,\n          "name": "rewardType",\n          "type": "string"\n        }\n      ],\n      "name": "Contribution",\n      "type": "event"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "contributor",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "date",\n          "type": "uint256"\n        }\n      ],\n      "name": "ContributorVerified",\n      "type": "event"\n    }\n  ],\n  "unlinked_binary": "0x606060405234156200000d57fe5b6040516200249238038062002492833981016040908152815160208301519183015160608401516080850151929493840193918201929101905b5b600160a060020a0333166000908152602081905260409020805460ff191660011790555b600160a060020a03851615620000a057600160a060020a0385166000908152602081905260409020805460ff191660011790555b60006001558251620000ba906003906020860190620008f5565b508151620000d0906004906020850190620008f5565b506002819055600160a060020a033316600090815260066020908152604090912085516200010192870190620008f5565b50600160a060020a038516600090815260066020908152604090912085516200012d92870190620008f5565b50846001600601856040518082805190602001908083835b60208310620001665780518252601f19909201916020918201910162000145565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060006101000a815481600160a060020a030219169083600160a060020a0316021790555080600a0a6109c402600160040160405180807f70696e6700000000000000000000000000000000000000000000000000000000815250600401905090815260200160405180910390208190555080600a0a6103e802600160040160405180807f7075736800000000000000000000000000000000000000000000000000000000815250600401905090815260200160405180910390208190555080600a0a60fa02600160040160405180807f636f6d6d6974436f6d6d656e7400000000000000000000000000000000000000815250600d01905090815260200160405180910390208190555080600a0a6109c402600160040160405180807f6372656174650000000000000000000000000000000000000000000000000000815250600601905090815260200160405180910390208190555080600a0a600002600160040160405180807f64656c6574650000000000000000000000000000000000000000000000000000815250600601905090815260200160405180910390208190555080600a0a61138802600160040160405180807f6465706c6f796d656e7400000000000000000000000000000000000000000000815250600a01905090815260200160405180910390208190555080600a0a606402600160040160405180807f6465706c6f796d656e7453746174757300000000000000000000000000000000815250601001905090815260200160405180910390208190555080600a0a61138802600160040160405180807f666f726b00000000000000000000000000000000000000000000000000000000815250600401905090815260200160405180910390208190555080600a0a60fa02600160040160405180807f676f6c6c756d0000000000000000000000000000000000000000000000000000815250600601905090815260200160405180910390208190555080600a0a60fa02600160040160405180807f696e7374616c6c6174696f6e0000000000000000000000000000000000000000815250600c01905090815260200160405180910390208190555080600a0a6103e802600160040160405180807f696e7374616c6c6174696f6e5265706f7369746f726965730000000000000000815250601801905090815260200160405180910390208190555080600a0a60fa02600160040160405180807f6973737565436f6d6d656e740000000000000000000000000000000000000000815250600c01905090815260200160405180910390208190555080600a0a606402600160040160405180807f6973737565730000000000000000000000000000000000000000000000000000815250600601905090815260200160405180910390208190555080600a0a606402600160040160405180807f6c6162656c000000000000000000000000000000000000000000000000000000815250600501905090815260200160405180910390208190555080600a0a600002600160040160405180807f6d61726b6574706c616365507572636861736500000000000000000000000000815250601301905090815260200160405180910390208190555080600a0a6103e802600160040160405180807f6d656d6265720000000000000000000000000000000000000000000000000000815250600601905090815260200160405180910390208190555080600a0a6103e802600160040160405180807f6d656d6265727368697000000000000000000000000000000000000000000000815250600a01905090815260200160405180910390208190555080600a0a613a9802600160040160405180807f6d696c6573746f6e650000000000000000000000000000000000000000000000815250600901905090815260200160405180910390208190555080600a0a6103e802600160040160405180807f6f7267616e697a6174696f6e0000000000000000000000000000000000000000815250600c01905090815260200160405180910390208190555080600a0a600002600160040160405180807f6f7267426c6f636b000000000000000000000000000000000000000000000000815250600801905090815260200160405180910390208190555080600a0a6101f402600160040160405180807f706167654275696c640000000000000000000000000000000000000000000000815250600901905090815260200160405180910390208190555080600a0a60fa02600160040160405180807f70726f6a65637443617264000000000000000000000000000000000000000000815250600b01905090815260200160405180910390208190555080600a0a60fa02600160040160405180807f70726f6a656374436f6c756d6e00000000000000000000000000000000000000815250600d01905090815260200160405180910390208190555080600a0a6103e802600160040160405180807f70756c6c5f726571756573740000000000000000000000000000000000000000815250600c0190509081526020016040518091039020819055505b50505050506200099f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200093857805160ff191683800117855562000968565b8280016001018555821562000968579182015b82811115620009685782518255916020019190600101906200094b565b5b50620009779291506200097b565b5090565b6200099c91905b8082111562000977576000815560010162000982565b5090565b90565b611ae380620009af6000396000f300606060405236156100eb5763ffffffff60e060020a600035041663025dabae81146100ed578063095ea7b31461015557806318160ddd146101765780631e923ded1461019857806323b872dd1461020a57806323bd4d7a14610231578063313ce567146102c15780633d1c22ed146102e357806366253c441461038c578063666e1b39146103f757806370a082311461042757806376500a7e1461045557806395d89b41146104bd578063a9059cbb1461054d578063abb8e21314610231578063b0cd70fd14610610578063d85600ca146106b7578063dd62ed3e1461072b578063f2fde38b1461075f575bfe5b34156100f557fe5b610143600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061077d95505050505050565b60408051918252519081900360200190f35b341561015d57fe5b610174600160a060020a03600435166024356107ea565b005b341561017e57fe5b6101436108a0565b60408051918252519081900360200190f35b34156101a057fe5b6101ee600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506108a795505050505050565b60408051600160a060020a039092168252519081900360200190f35b341561021257fe5b610174600160a060020a036004358116906024351660443561091d565b005b341561023957fe5b61024161098f565b604080516020808252835181830152835191928392908301918501908083838215610287575b80518252602083111561028757601f199092019160209182019101610267565b505050905090810190601f1680156102b35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102c957fe5b610143610a28565b60408051918252519081900360200190f35b34156102eb57fe5b610378600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b018035918201839004830284018301909452808352979998810197919650918201945092508291508401838280828437509496505093359350610a2f92505050565b604080519115158252519081900360200190f35b341561039457fe5b60408051602060046024803582810135601f81018590048502860185019096528585526103789583359593946044949392909201918190840183828082843750949650610c2895505050505050565b604080519115158252519081900360200190f35b34156103ff57fe5b610378600160a060020a0360043516610cc3565b604080519115158252519081900360200190f35b341561042f57fe5b610143600160a060020a0360043516610cd8565b60408051918252519081900360200190f35b341561045d57fe5b610143600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650610cf795505050505050565b60408051918252519081900360200190f35b34156104c557fe5b610241610d64565b604080516020808252835181830152835191928392908301918501908083838215610287575b80518252602083111561028757601f199092019160209182019101610267565b505050905090810190601f1680156102b35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561055557fe5b610378600160a060020a0360043516602435610dfd565b604080519115158252519081900360200190f35b341561023957fe5b61024161098f565b604080516020808252835181830152835191928392908301918501908083838215610287575b80518252602083111561028757601f199092019160209182019101610267565b505050905090810190601f1680156102b35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561061857fe5b610378600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b01803591820183900483028401830190945280835297999881019791965091820194509250829150840183828082843750949650610f0a95505050505050565b604080519115158252519081900360200190f35b34156106bf57fe5b60408051602060046024803582810135601f8101859004850286018501909652858552610378958335600160a060020a03169593946044949392909201918190840183828082843750949650610f3995505050505050565b604080519115158252519081900360200190f35b341561073357fe5b610143600160a060020a0360043581169060243516610fce565b60408051918252519081900360200190f35b341561076757fe5b610174600160a060020a0360043516610ffb565b005b60006001600401826040518082805190602001908083835b602083106107b45780518252601f199092019160209182019101610795565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054925050505b919050565b604060443610156107fb5760006000fd5b6000821180156108305750600160a060020a033381166000908152600860209081526040808320938716835292905290812054115b1561083b5760006000fd5b600160a060020a03338116600081815260086020908152604080832094881680845294825291829020869055815186815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a35b5b5b505050565b6001545b90565b60006001600601826040518082805190602001908083835b602083106108de5780518252601f1990920191602091820191016108bf565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054600160a060020a0316925050505b919050565b6060606436101561092e5760006000fd5b610941600185858563ffffffff61108216565b151561094d5760006000fd5b82600160a060020a031684600160a060020a0316600080516020611a98833981519152846040518082815260200191505060405180910390a35b5b5b50505050565b6109976119e5565b6003805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610a1d5780601f106109f257610100808354040283529160200191610a1d565b820191906000526020600020905b815481529060010190602001808311610a0057829003601f168201915b505050505090505b90565b6002545b90565b600160a060020a0333166000908152602081905260408120548190819060ff161515610a5b5760006000fd5b610a6e600187878763ffffffff61116716565b1515610a7a5760006000fd5b6001600601866040518082805190602001908083835b60208310610aaf5780518252601f199092019160209182019101610a90565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381018420548951600160a060020a039091169650610b5694899450600593508a92909182918401908083835b60208310610b215780518252601f199092019160209182019101610b02565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054929150506113a9565b905081600160a060020a03167feb1d29659fe1e458a59d47ceab90b84b14e2eb79da4602088f9e9a8bcc228ca48242886040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360008314610bdd575b805182526020831115610bdd57601f199092019160209182019101610bbd565b505050905090810190601f168015610c095780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a2600192505b5b5b50509392505050565b600160a060020a03331660009081526020819052604081205460ff161515610c505760006000fd5b826001600401836040518082805190602001908083835b60208310610c865780518252601f199092019160209182019101610c67565b51815160209384036101000a60001901801990921691161790529201948552506040519384900301909220929092555060019150505b5b92915050565b60006020819052908152604090205460ff1681565b600160a060020a0381166000908152600960205260409020545b919050565b60006001600901826040518082805190602001908083835b602083106107b45780518252601f199092019160209182019101610795565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054925050505b919050565b610d6c6119e5565b6004805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610a1d5780601f106109f257610100808354040283529160200191610a1d565b820191906000526020600020905b815481529060010190602001808311610a0057829003601f168201915b505050505090505b90565b600060406044361015610e105760006000fd5b610e226001858563ffffffff6113c516565b1515610e2e5760006000fd5b83600160a060020a031633600160a060020a0316600080516020611a98833981519152856040518082815260200191505060405180910390a35b5b5b5092915050565b6109976119e5565b6003805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610a1d5780601f106109f257610100808354040283529160200191610a1d565b820191906000526020600020905b815481529060010190602001808311610a0057829003601f168201915b505050505090505b90565b6000610f1e6001848463ffffffff61144d16565b1515610f2a5760006000fd5b506001610cbc565b5b92915050565b600160a060020a03331660009081526020819052604081205460ff161515610f615760006000fd5b610f736001848463ffffffff61175f16565b1515610f7f5760006000fd5b604080514281529051600160a060020a038516917ffa9d9d86b3d6ec6b9069cfd9231a1f4e55884ff25c294686274441f354e7642f919081900360200190a2506001610cbc565b5b5b92915050565b600160a060020a038083166000908152600860209081526040808320938516835292905220545b92915050565b600160a060020a03331660009081526020819052604090205460ff1615156110235760006000fd5b600160a060020a03811660009081526020819052604090205460ff16151561107d57600160a060020a03808216600090815260208190526040808220805460ff199081166001179091553390931682529020805490911690555b5b5b50565b600160a060020a0380841660009081526007860160209081526040808320339094168352929052908120546110bd818463ffffffff6119bb16565b600160a060020a038087166000908152600789016020908152604080832033851684528252808320949094559187168152600889019091522054611107908463ffffffff6113a916565b600160a060020a038086166000908152600889016020526040808220939093559087168152205461113e908463ffffffff6119bb16565b600160a060020a0386166000908152600888016020526040902055600191505b50949350505050565b6000600060006111da8488600401876040518082805190602001908083835b60208310610b215780518252601f199092019160209182019101610b02565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054929150506113a9565b915086600601866040518082805190602001908083835b602083106112105780518252601f1990920191602091820191016111f1565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054600160a060020a0316925050508115156112565760006000fd5b8654611268908363ffffffff6113a916565b8755600160a060020a0381161515611352576112e78288600901886040518082805190602001908083835b60208310610b215780518252601f199092019160209182019101610b02565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054929150506113a9565b87600901876040518082805190602001908083835b6020831061131b5780518252601f1990920191602091820191016112fc565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922092909255506113999050565b600160a060020a038116600090815260088801602052604090205461137d908363ffffffff6113a916565b600160a060020a03821660009081526008890160205260409020555b600192505b5b5050949350505050565b60008282016113ba848210156119d4565b8091505b5092915050565b600160a060020a03331660009081526008840160205260408120546113f0908363ffffffff6119bb16565b600160a060020a0333811660009081526008870160205260408082209390935590851681522054611427908363ffffffff6113a916565b600160a060020a03841660009081526008860160205260409020555060015b9392505050565b6000816040518082805190602001908083835b6020831061147f5780518252601f199092019160209182019101611460565b51815160209384036101000a60001901801990921691161790526040519190930181900381208851909550600a8a019450889391925082918401908083835b602083106114dd5780518252601f1990920191602091820191016114be565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092205492909214915061151b90505760006000fd5b600084600901846040518082805190602001908083835b602083106115515780518252601f199092019160209182019101611532565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390205411156116a65761161384600901846040518082805190602001908083835b602083106115c25780518252601f1990920191602091820191016115a3565b51815160209384036101000a6000190180199092169116179052920194855250604080519485900382019094205433600160a060020a0316600090815260088b0190925293902054929150506113a9565b84600801600033600160a060020a0316600160a060020a0316815260200190815260200160002081905550600084600901846040518082805190602001908083835b602083106116745780518252601f199092019160209182019101611655565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092209290925550505b600160a060020a0333166000908152600585016020908152604090912084516116d1928601906119f7565b503384600601846040518082805190602001908083835b602083106117075780518252601f1990920191602091820191016116e8565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092208054600160a060020a031916600160a060020a0394909416939093179092555060019150505b9392505050565b6000600160a060020a03831615156117775760006000fd5b600084600901836040518082805190602001908083835b602083106117ad5780518252601f19909201916020918201910161178e565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390205411156119025761186f84600901836040518082805190602001908083835b6020831061181e5780518252601f1990920191602091820191016117ff565b51815160209384036101000a60001901801990921691161790529201948552506040805194859003820190942054600160a060020a038916600090815260088b0190925293902054929150506113a9565b84600801600085600160a060020a0316600160a060020a0316815260200190815260200160002081905550600084600901836040518082805190602001908083835b602083106118d05780518252601f1990920191602091820191016118b1565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092209290925550505b600160a060020a03831660009081526005850160209081526040909120835161192d928501906119f7565b508284600601836040518082805190602001908083835b602083106117075780518252601f1990920191602091820191016116e8565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092208054600160a060020a031916600160a060020a0394909416939093179092555060019150505b9392505050565b60006119c9838311156119d4565b508082035b92915050565b80151561107d5760006000fd5b5b50565b60408051602081019091526000815290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611a3857805160ff1916838001178555611a65565b82800160010185558215611a65579182015b82811115611a65578251825591602001919060010190611a4a565b5b50611a72929150611a76565b5090565b6108a491905b80821115611a725760008155600101611a7c565b5090565b905600ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa165627a7a723058201b537405a1417d4029b2b33dd8569dbb296fe6dcff2229969fc92733a0308bb00029",\n  "networks": {\n    "17": {\n      "links": {},\n      "events": {\n        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "owner",\n              "type": "address"\n            },\n            {\n              "indexed": true,\n              "name": "spender",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "value",\n              "type": "uint256"\n            }\n          ],\n          "name": "Approval",\n          "type": "event"\n        },\n        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "from",\n              "type": "address"\n            },\n            {\n              "indexed": true,\n              "name": "to",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "value",\n              "type": "uint256"\n            }\n          ],\n          "name": "Transfer",\n          "type": "event"\n        },\n        "0xeb1d29659fe1e458a59d47ceab90b84b14e2eb79da4602088f9e9a8bcc228ca4": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "contributor",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "value",\n              "type": "uint256"\n            },\n            {\n              "indexed": false,\n              "name": "date",\n              "type": "uint256"\n            },\n            {\n              "indexed": false,\n              "name": "rewardType",\n              "type": "string"\n            }\n          ],\n          "name": "Contribution",\n          "type": "event"\n        },\n        "0xfa9d9d86b3d6ec6b9069cfd9231a1f4e55884ff25c294686274441f354e7642f": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "contributor",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "date",\n              "type": "uint256"\n            }\n          ],\n          "name": "ContributorVerified",\n          "type": "event"\n        }\n      },\n      "updated_at": 1499629958107\n    }\n  },\n  "schema_version": "0.0.5",\n  "updated_at": 1499629958107\n}';

var GitTokenMiddleware = function (_KeystoreGenerator) {
  (0, _inherits3.default)(GitTokenMiddleware, _KeystoreGenerator);

  function GitTokenMiddleware(options) {
    (0, _classCallCheck3.default)(this, GitTokenMiddleware);

    var _this

    // bind utility methods to class scope


    //
    = (0, _possibleConstructorReturn3.default)(this, (GitTokenMiddleware.__proto__ || (0, _getPrototypeOf2.default)(GitTokenMiddleware)).call(this, options));

    var githubCredentials = options.githubCredentials,
        isGitHubHook = options.isGitHubHook,
        config = options.config,
        web3Provider = options.web3Provider,
        dirPath = options.dirPath,
        contractFile = options.contractFile,
        faucetActive = options.faucetActive;


    _this.githubCredentials = githubCredentials;
    _this.faucetActive = faucetActive;
    _this.dirPath = dirPath;
    _this.contractFile = contractFile;
    _this.gittokenContract = JSON.parse(GitTokenContract);
    _this.isGitHubHook = isGitHubHook;
    _this.config = config;

    // this.dirPath = dirPath
    // this.web3Provider = web3Provider
    // this.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
    // this.eth = promisifyAll(this.web3.eth)
    // this.smtpHandleAuth = smtpHandleAuth.bind(this)
    // this.smtpServer = smtpServer.bind(this)
    // this.smtpServer({
    //   onAuth: this.smtpHandleAuth
    // })
    _this.verifyContributor = _index6.verifyContributor.bind(_this);

    _this.gittokenHyperlog = _index4.gittokenHyperlog.bind(_this);
    _this.logMessage = _index4.logMessage.bind(_this);
    _this.logExchange = _index4.logExchange.bind(_this);
    _this.logVote = _index4.logVote.bind(_this);
    _this.handleLogin = _index5.handleLogin.bind(_this);
    _this.handleVerification = _index5.handleVerification.bind(_this);
    _this.handleAuthentication = _index5.handleAuthentication.bind(_this);
    _this.handleContractDetails = _index5.handleContractDetails.bind(_this);

    _this.gittokenHyperlog({});

    _this.socketHandler = _index2.socketHandler.bind(_this);
    _this.socketRouter = _index2.socketRouter.bind(_this);
    _this.socketHandler({}

    // Bind event methods to class scope

    );_this.ping = _index5.ping.bind(_this);
    _this.push = _index5.push.bind(_this);
    _this.pullRequest = _index5.pullRequest.bind(_this);_this.getSavedContract = _index6.getSavedContract.bind(_this);
    _this.createGitTokenContract = _index6.createGitTokenContract.bind(_this);
    _this.saveContractDetails = _index6.saveContractDetails.bind(_this);
    _this.retrieveDetails = _index3.retrieveDetails.bind(_this);
    _this.parsePushEvent = _index3.parsePushEvent.bind(_this);
    _this.parseGitHubEvents = _index3.parseGitHubEvents.bind(_this);
    _this.faucet = _index3.faucet.bind(_this);
    _this.generateReward = _index6.generateReward.bind(_this);
    _this.calculateRewardBonus = _index3.calculateRewardBonus.bind(_this);_this.middlewareState = {
      accounts: {},
      contract: {},
      blockchain: {}
    };
    return _this;
  }

  (0, _createClass3.default)(GitTokenMiddleware, [{
    key: 'routeRequests',
    value: function routeRequests() {
      var _this2 = this;

      var router = (0, _express.Router)();

      _passport2.default.use(new _passportGithub.Strategy(this.githubCredentials, function (accessToken, refreshToken, profile, cb) {
        cb(null, { accessToken: accessToken, profile: profile });
      }));

      _passport2.default.serializeUser(function (user, cb) {
        cb(null, user);
      });

      _passport2.default.deserializeUser(function (user, cb) {
        cb(null, user);
      });

      router.use(_passport2.default.initialize());
      router.use(_passport2.default.session());
      router.use('/messenger', _express2.default.static(process.cwd() + '/node_modules/gittoken-messenger-ui/'));
      router.get('/auth', _passport2.default.authenticate('github'));
      router.get('/auth/callback', _passport2.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
        res.redirect('/messenger');
      });

      router.post('/verify/:address', function (req, res) {
        console.log('gittoken::verify::req.user', req.user);
        res.send(true);
      });

      router.post('/', function (req, res, next) {
        var headers = req.headers,
            body = req.body;

        _bluebird2.default.resolve().then(function () {
          if (_this2.isGitHubHook) {
            // console.log('GitHub WebHook Request')
            return _this2.handleGitHubWebHookEvent({
              event: headers['x-github-event'],
              data: { headers: headers, body: body }
            });
          } else {
            throw new Error('Request not yet configured');
          }
        }).then(function (response) {
          res.status(200).send((0, _stringify2.default)(response, null, 2));
        }).catch(function (error) {
          console.log('routeRequests::error', error);
          res.status(500).send(error.message);
        });
      });

      router.post('/faucet/:address', function (req, res, next) {
        if (!_this2.faucetActive) {
          res.status(500).send((0, _stringify2.default)({
            message: 'Faucet is not active! Set { faucetActive: true } to enable'
          }, null, 2));
        } else {
          var from = void 0;
          _this2.importKeystore({}).then(function (_ks) {
            from = '0x' + _this2.ks.getAddresses()[0];
            return _this2.eth.getBalanceAsync(from);
          }).then(function (balance) {
            console.log('Balance of ' + from + '::balance', balance);
            if (balance.toNumber() > 2e16) {
              return _this2.signTransaction({
                to: '0x' + req.params.address,
                from: from,
                value: 2e16,
                gasLimit: 4e6,
                data: null
              });
            } else {
              res.status(500).send((0, _stringify2.default)({
                message: 'Faucet does not have enough funds! Send funds to ' + from,
                balance: balance
              }, null, 2));
            }
          }).then(function (signedTx) {
            console.log('`0x${signedTx}`', '0x' + signedTx);
            return _this2.eth.sendRawTransactionAsync('0x' + signedTx);
          }).then(function (txHash) {
            console.log('txHash', txHash);
            return _this2.getTransactionReceipt(txHash);
          }).then(function (txReceipt) {
            console.log('txReceipt', txReceipt);
            res.status(200).send(txReceipt);
          }).catch(function (error) {
            console.log('error', error);
            res.status(500).send((0, _stringify2.default)(error, null, 2));
          });
        }
      });

      return router;
    }
  }, {
    key: 'handleGitHubWebHookEvent',
    value: function handleGitHubWebHookEvent(_ref) {
      var _this3 = this;

      var event = _ref.event,
          data = _ref.data;

      return new _bluebird2.default(function (resolve, reject) {
        console.log('handleGitHubWebHookEvent::event', event);
        console.log('handleGitHubWebHookEvent::data', data);

        switch (event) {
          case 'ping':
            resolve(_this3.ping(data));
            break;
          case 'push':
            resolve(_this3.push(data));
            break;
          case 'pull_request':
            resolve(_this3.pullRequest(data));
            break;
          default:
            var error = new Error('Invalid Event Found');
            reject(error);
        }
      });
    }
  }]);
  return GitTokenMiddleware;
}(_KeystoreGenerator3.default);

exports.default = GitTokenMiddleware;