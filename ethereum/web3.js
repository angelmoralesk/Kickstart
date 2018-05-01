import Web3 from 'web3';

let web3;

// typeof checa si window is defined
// checar si running code on the server or the browser
// y si viene inyectado web3
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);

} else {

  // we are on the server "OR" the user is not running metamask

  // we set up our provider that connects to Rinkeby network through Infura
  //console.log('Running on Infura')
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/6SNNxQqfy90KxEzAvCwi'
  );
  web3 = new Web3(provider);
}

export default web3;
