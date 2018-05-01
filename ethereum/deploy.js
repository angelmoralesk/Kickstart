const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');


const provider = new HDWalletProvider(
  'awful find cattle relax tell soap eyebrow credit state question mouse denial',
  'https://rinkeby.infura.io/6SNNxQqfy90KxEzAvCwi'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({ data: compiledFactory.bytecode })
            .send({ gas:'1000000', from:accounts[0] });

  // el despliegue del contrato en la red rinkeby.
  console.log('Contract deployed to', result.options.address);
};

deploy();
