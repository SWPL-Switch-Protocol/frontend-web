import { WEB3AUTH_NETWORK } from '@web3auth/modal';
import type { Web3AuthContextConfig } from '@web3auth/modal/react';

// Web3Auth React modal configuration
// Uses sapphire_devnet as in the official quick-start
const clientId = import.meta.env.WEB3AUTH_CLIENT_ID;

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
  }
};

export default web3AuthContextConfig;


