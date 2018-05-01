const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory; // reference to the deployed factory
let campaignAddress;
let campaign;

beforeEach(async () => {

  accounts = await web3.eth.getAccounts();

  // deploy an instance of a factory contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                      .deploy({  data: compiledFactory.bytecode  })
                      .send({ from: accounts[0], gas:'1000000' });

  // usar factory para crear una instancia del campaign
  // usamos send (no call) porque enviamos una transacción al Blockchain
  // modify data on the Blockchain
  // Se crea una campaña pero no obtenemos referencia a ella, sino usando el arreglo del factory
  await factory.methods.createCampaign('100').send({
    from: accounts[0], //persona enviando la transaccion
    gas: '1000000'
  }); // contribución de 100 wei

  // usamos call y no send, porque no estamos cambiando any data

  //const addresses = await factory.methods.getDeployedCampaigns().call();
  //campaignAddress = addresses[0];

  //toma el primer elemento del arreglo
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  //crear JS representation of the contract
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),//ABI for the campaign
    campaignAddress//dirección donde existe esta campaña, already deployed.
  );

});

describe('Campaigns', () => {
  // checar si factory y campaign fueron deployed, y lo validamos si tienen direcciones
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  //quien crea la campaña debe ser el manager
  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  //checar la funcionalidad de contributor, la contribución minima es 100
  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
        value : '200',
        from: accounts[1]
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('requires a minimum contribution', async() => {
    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('allows a manager to make a payment request', async() => {
    await campaign.methods
                  .createRequest('Buy batteries', '100', accounts[1])
                  .send({
                    from: accounts[0],
                    gas: '1000000'
                  });

    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });

  it('processes requests', async () => {
    //contribuir a la campaña
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
                  .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
                  .send({ from: accounts[0], gas: '1000000'} );

    await campaign.methods
                  .approveRequest(0)
                  .send({ from: accounts[0], gas: '1000000'});

    await campaign.methods
                  .finalizeRequest(0)
                  .send({ from: accounts[0], gas:'1000000'});

    let balance = await web3.eth.getBalance(accounts[1]); // string
    balance = web3.utils.fromWei(balance, 'ether'); //convertir el balance en ether
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });

});
