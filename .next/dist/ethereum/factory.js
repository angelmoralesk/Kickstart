'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// crear contract instance that refers to specific address y exportarlo en este archivo
var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), '0xEe26bDF5d86ED70489bEE8B7A7CFB9968a475359'); //importar la copia de web3, la instancia que creamos

//import the compiled contract, al decirle a web3 tenemos que darle interface del contrato ubicado en CampaignFactory
exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeSIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQWlCLEEsQUFBakIsQUFBTzs7OztBQUdQLEFBQU8sQUFBcUI7Ozs7OztBQUU1QjtBQUNBLElBQU0sV0FBVyxJQUFJLGNBQUEsQUFBSyxJQUFULEFBQWEsU0FDNUIsS0FBQSxBQUFLLE1BQU0sMEJBREksQUFDZixBQUEyQixZQUQ3QixBQUFpQixBQUVmLEFBR0YsK0NBWDJCOztBQUUzQjtrQkFTQSxBQUFlIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FuZ2VsbW9yYWxlcy9Eb2N1bWVudHMvRGV2ZWxvcGVyL0Jsb2NrY2hhaW4vS2lja3N0YXJ0In0=