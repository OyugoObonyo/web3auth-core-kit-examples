import { WEB3AUTH_NETWORK, Web3AuthMPCCoreKit } from "@web3auth/mpc-core-kit";

const web3AuthClientID =
  "BHjYNrujLVLz_hMD9fo76Pjz-5tjQQuTVLagPblNDsTeyLzyE5oxnJ_76iNn6OWtM5yt3FnPeSNjIVXnH7wUGy8";

export const coreKitInstance = new Web3AuthMPCCoreKit({
  web3AuthClientId: web3AuthClientID,
  web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x13881", // hex of 80001, polygon testnet
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Polygon Mumbai Testnet",
    blockExplorer: "https://mumbai.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "Matic",
  },
});

