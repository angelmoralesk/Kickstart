import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';


class CampaignIndex extends Component {

  // función exclusivo de Next
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns : campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
    <Layout>
      <div>
      <h3>Open Campaigns</h3>
      <Link route="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create campaign"
            icon="add"
            primary
            />
        </a>
      </Link>
        {this.renderCampaigns()}

        </div>
        </Layout>
      );
  }

}

// se espera tu export a react component sino hay error
export default CampaignIndex;
// PASO 1. (en web3.js)
// Para acceder a data from Ethereum world necesitamos web3 con provider ( lo que usa para
// comunicarse con Ethereum network )
// configure web3 with a provider from Metamask

// Metamask inyecta a provider en la pagina cuando corre

// PASO 2.
// Decirle a web3 que una copia de CampaignFactory exists, le daremos la interface y dirección
// nos dará una instancia del Factory

// PASO 3.
// Usamos la instancia del Factory to retrieve a list of deployed campaings

// PASO 4.
// Usar React para mostrar información de cada campaña
