import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/modal";
import type { Web3AuthContextConfig } from "@web3auth/modal/react";

// Web3Auth React modal configuration
// Uses sapphire_devnet as in the official quick-start
// Client ID is provided via Vite env: WEB3AUTH_CLIENT_ID=...
const clientId = import.meta.env.WEB3AUTH_CLIENT_ID as string;

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    chains: [
      {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x61", // 97 -> hex
        rpcTarget:
          "https://bsc-testnet.g.allthatnode.com/full/evm/6a0a766e1f9c413282501701bc78b13a",
        displayName: "BSC Testnet",
        ticker: "BNB",
        tickerName: "Binance Coin",
        blockExplorerUrl: "https://testnet.bscscan.com",
        logo: "https://bsc.org/img/logo.png",
      },
    ],
    defaultChainId: "0x61",
  },
};

export default web3AuthContextConfig;
