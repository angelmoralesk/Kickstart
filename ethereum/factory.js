import web3 from './web3'; //importar la copia de web3, la instancia que creamos

//import the compiled contract, al decirle a web3 tenemos que darle interface del contrato ubicado en CampaignFactory
import CampaignFactory from './build/CampaignFactory.json';

// crear contract instance that refers to specific address y exportarlo en este archivo
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xEe26bDF5d86ED70489bEE8B7A7CFB9968a475359'
);

export default instance;
