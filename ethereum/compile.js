// Feed the contract (Campaign.sol) to the solidity compiler.
// the compiler outputs the compiled campaign and compiled factoryCampaign
// we place the compiled contracts to the build folder

const path = require('path');
const solc = require('solc'); // solidity compiler
const fs = require('fs-extra'); // improved version of fs module

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source, 1).contracts; // contiene 2 objetos (CampaighFactory y Campaign)

fs.ensureDirSync(buildPath) // checa si existe un directorio, sino lo crea

//tomamos cada contrato y lo ponemos como archivos
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
